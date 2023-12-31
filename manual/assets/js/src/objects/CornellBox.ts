import {
	BoxGeometry,
	CylinderGeometry,
	Group,
	LightProbe,
	Mesh,
	MeshStandardMaterial,
	PlaneGeometry,
	PointLight,
	SphereGeometry,
	Vector3
} from "three";

/**
 * Creates lights.
 *
 * @return The lights.
 */

export function createLights(): Group {

	// Generated by rendering the environment with an ambient light value of 0x523f1c.
	const shCoefficients = [
		[0.12324091787538365, 0.09064047524231066, 0.05263591868309067],
		[0.07505564151881193, 0.07505564221782213, 0.07505564728562912],
		[-1.2738801795225628e-18, -1.3862720782180785e-18, 7.2901209466271645e-19],
		[-0.022844675139794938, 0.013457944286841193, -2.555398129446308e-20],
		[-6.378735628644095e-19, 3.723254872321192e-19, -4.827259490682807e-20],
		[-7.1448287739362375e-19, -1.307481902513501e-18, -9.613106193675661e-19],
		[-0.037415948039784014, -0.041434962772114364, -0.044504851419885576],
		[3.0317816726499583e-20, -4.584564755673668e-20, 4.745534065260507e-21],
		[-0.09868906531272167, -0.09172794146160522, -0.0864107588144471]
	];

	const lightProbe = new LightProbe();
	lightProbe.sh.coefficients = shCoefficients.map(x => new Vector3(x[0], x[1], x[2]));
	lightProbe.intensity = 1.8;

	const lightCeiling = new PointLight(0xfee2b0, 1, 3);
	lightCeiling.position.set(0, 0.93, 0);
	lightCeiling.castShadow = true;
	lightCeiling.shadow.bias = -0.035;
	lightCeiling.shadow.mapSize.width = 1024;
	lightCeiling.shadow.mapSize.height = 1024;
	lightCeiling.shadow.radius = 4;

	const lights = new Group();
	lights.add(lightProbe, lightCeiling);

	return lights;

}

/**
 * Creates the environment.
 *
 * @return The environment.
 */

export function createEnvironment(): Group {

	const planeGeometry = new PlaneGeometry();
	const planeMaterial = new MeshStandardMaterial({
		color: 0xffffff
	});

	const plane00 = new Mesh(planeGeometry, planeMaterial);
	const plane01 = new Mesh(planeGeometry, planeMaterial);
	const plane02 = new Mesh(planeGeometry, planeMaterial);
	const plane03 = new Mesh(planeGeometry, planeMaterial);
	const plane04 = new Mesh(planeGeometry, planeMaterial);

	plane00.position.y = -1;
	plane00.rotation.x = Math.PI * 0.5;
	plane00.scale.set(2, 2, 1);

	plane01.position.y = -1;
	plane01.rotation.x = Math.PI * -0.5;
	plane01.scale.set(2, 2, 1);
	plane01.receiveShadow = true;

	plane02.position.y = 1;
	plane02.rotation.x = Math.PI * 0.5;
	plane02.scale.set(2, 2, 1);
	plane02.receiveShadow = true;

	plane03.position.z = -1;
	plane03.scale.set(2, 2, 1);
	plane03.receiveShadow = true;

	plane04.position.z = 1;
	plane04.rotation.y = Math.PI;
	plane04.scale.set(2, 2, 1);
	plane04.receiveShadow = true;

	const plane05 = new Mesh(
		planeGeometry,
		new MeshStandardMaterial({
			color: 0xff0000
		})
	);

	const plane06 = new Mesh(
		planeGeometry,
		new MeshStandardMaterial({
			color: 0x00ff00
		})
	);

	plane05.position.x = -1;
	plane05.rotation.y = Math.PI * 0.5;
	plane05.scale.set(2, 2, 1);
	plane05.receiveShadow = true;

	plane06.position.x = 1;
	plane06.rotation.y = Math.PI * -0.5;
	plane06.scale.set(2, 2, 1);
	plane06.receiveShadow = true;

	const environment = new Group();
	environment.add(
		plane00, plane01, plane02, plane03,
		plane04, plane05, plane06
	);

	return environment;

}

/**
 * Creates the scene actors.
 *
 * @return The actors.
 */

export function createActors(): Group {

	const actor01 = new Mesh(
		new CylinderGeometry(0.6, 0.6, 1),
		new MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.5,
			metalness: 0
		})
	);

	const actor02 = new Mesh(
		new BoxGeometry(1, 1, 1),
		new MeshStandardMaterial({
			color: 0xffaaff,
			roughness: 1,
			metalness: 0
		})
	);

	const actor03 = new Mesh(
		new SphereGeometry(1, 32, 32), new MeshStandardMaterial({
			color: 0xaaffff,
			roughness: 0,
			metalness: 0.1
		})
	);

	const zFightingBias = 1e-4;

	actor01.position.set(-0.35, -0.4 + zFightingBias, -0.3);
	actor01.rotation.y = Math.PI * 0.1;
	actor01.scale.set(0.6, 1.2, 0.6);
	actor01.castShadow = true;

	actor02.position.set(0.35, -0.7 + zFightingBias, 0.3);
	actor02.rotation.y = Math.PI * -0.1;
	actor02.scale.set(0.6, 0.6, 0.6);
	actor02.castShadow = true;

	actor03.position.set(-0.5, -0.7 + zFightingBias, 0.6);
	actor03.scale.set(0.3, 0.3, 0.3);
	actor03.castShadow = true;

	const actors = new Group();
	actors.add(actor01, actor02, actor03);

	return actors;

}
