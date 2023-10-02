import {
	LoadingManager,
	PerspectiveCamera,
	PlaneGeometry,
	Mesh,
	MeshBasicMaterial,
	Scene,
	TextureLoader,
	WebGLRenderer,
	Texture,
	SRGBColorSpace
} from "three";

import {
	BlendFunction,
	EffectPass,
	GeometryPass,
	KernelSize,
	RenderPipeline
	// TiltShiftEffect
} from "postprocessing";

import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import { ControlMode, SpatialControls } from "spatial-controls";
import { calculateVerticalFoV } from "../utils/index.js";

function load(): Promise<Map<string, unknown>> {

	const assets = new Map<string, unknown>();
	const loadingManager = new LoadingManager();
	const textureLoader = new TextureLoader(loadingManager);

	return new Promise<Map<string, unknown>>((resolve, reject) => {

		loadingManager.onLoad = () => resolve(assets);
		loadingManager.onError = (url) => reject(new Error(`Failed to load ${url}`));

		textureLoader.load(`${document.baseURI}img/textures/photos/GEDC0053.jpg`, (t) => {

			t.colorSpace = SRGBColorSpace;
			assets.set("photo", t);

		});

	});

}

window.addEventListener("load", () => void load().then((assets) => {

	// Renderer

	const renderer = new WebGLRenderer({
		powerPreference: "high-performance",
		antialias: false,
		stencil: false,
		depth: false
	});

	renderer.debug.checkShaderErrors = (window.location.hostname === "localhost");
	renderer.setClearAlpha(0);

	const container = document.querySelector(".viewport") as HTMLElement;
	container.prepend(renderer.domElement);

	// Camera & Controls

	const camera = new PerspectiveCamera();
	const controls = new SpatialControls(camera.position, camera.quaternion, renderer.domElement);
	const settings = controls.settings;
	settings.general.mode = ControlMode.THIRD_PERSON;
	settings.zoom.sensitivity = 0.05;
	settings.zoom.damping = 0.1;
	settings.rotation.sensitivity = 0;
	settings.translation.enabled = false;
	controls.position.set(0, 0, 1.4);

	// Scene & Objects

	const scene = new Scene();
	const mesh = new Mesh(
		new PlaneGeometry(),
		new MeshBasicMaterial({
			map: assets.get("photo") as Texture
		})
	);

	mesh.scale.x = 2;
	scene.add(mesh);

	// Post Processing

	/*
	const effect = new TiltShiftEffect({
		kernelSize: KernelSize.LARGE,
		offset: 0.25,
		rotation: 3.01,
		focusArea: 0.3,
		feather: 0.25
	});

	const pipeline = new RenderPipeline(renderer);
	pipeline.addPass(new GeometryPass(scene, camera, { samples: 4 }));
	pipeline.addPass(new EffectPass(effect));
	*/

	// Settings

	const pane = new Pane({ container: container.querySelector(".tp") as HTMLElement });
	pane.registerPlugin(EssentialsPlugin);
	const fpsMeter = pane.addBlade({ view: "fpsgraph", label: "FPS", rows: 2 }) as EssentialsPlugin.FpsGraphBladeApi;

	/*
	const folder = pane.addFolder({ title: "Settings" });
	let subfolder = folder.addFolder({ title: "Blur" });
	subfolder.addBinding(effect.blurPass.blurMaterial, "kernelSize", { options: KernelSize });
	subfolder.addBinding(effect.blurPass.blurMaterial, "scale", { min: 0, max: 2, step: 0.01 });
	subfolder.addBinding(effect.resolution, "scale", { label: "resolution", min: 0.25, max: 1, step: 0.05 });
	subfolder = folder.addFolder({ title: "Gradient Mask" });
	subfolder.addBinding(effect, "offset", { min: -1, max: 1, step: 1e-2 });
	subfolder.addBinding(effect, "rotation", { min: 0, max: 2 * Math.PI, step: 1e-2 });
	subfolder.addBinding(effect, "focusArea", { min: 0, max: 1, step: 1e-2 });
	subfolder.addBinding(effect, "feather", { min: 0, max: 1, step: 1e-3 });
	folder.addBinding(effect.blendMode, "opacity", { min: 0, max: 1, step: 1e-2 });
	folder.addBinding(effect.blendMode, "blendFunction", { options: BlendFunction });
	*/

	// Resize Handler

	function onResize(): void {

		const width = container.clientWidth, height = container.clientHeight;
		camera.aspect = width / height;
		camera.fov = calculateVerticalFoV(90, Math.max(camera.aspect, 16 / 9));
		camera.updateProjectionMatrix();
		// pipeline.setSize(width, height);

	}

	window.addEventListener("resize", onResize);
	onResize();

	// Render Loop

	requestAnimationFrame(function render(timestamp: number): void {

		fpsMeter.begin();
		controls.update(timestamp);
		// pipeline.render(timestamp);
		fpsMeter.end();
		requestAnimationFrame(render);

	});

}));