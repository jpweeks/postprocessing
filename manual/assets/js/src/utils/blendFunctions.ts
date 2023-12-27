import {
	AddBlendFunction,
	AlphaBlendFunction,
	AverageBlendFunction,
	ColorBlendFunction,
	ColorBurnBlendFunction,
	ColorDodgeBlendFunction,
	DarkenBlendFunction,
	DifferenceBlendFunction,
	DivideBlendFunction,
	DstBlendFunction,
	ExclusionBlendFunction,
	HardLightBlendFunction,
	HardMixBlendFunction,
	HueBlendFunction,
	InvertBlendFunction,
	InvertRGBBlendFunction,
	LightenBlendFunction,
	LinearBurnBlendFunction,
	LinearDodgeBlendFunction,
	LinearLightBlendFunction,
	LuminosityBlendFunction,
	MixBlendFunction,
	MultiplyBlendFunction,
	NegationBlendFunction,
	OverlayBlendFunction,
	PinLightBlendFunction,
	ReflectBlendFunction,
	SaturationBlendFunction,
	SrcBlendFunction,
	ScreenBlendFunction,
	SoftLightBlendFunction,
	SubtractBlendFunction,
	VividLightBlendFunction
} from "postprocessing";

export const blendFunctions = {
	"add": new AddBlendFunction(),
	"alpha": new AlphaBlendFunction(),
	"average": new AverageBlendFunction(),
	"color": new ColorBlendFunction(),
	"color-burn": new ColorBurnBlendFunction(),
	"color-dodge": new ColorDodgeBlendFunction(),
	"darken": new DarkenBlendFunction(),
	"difference": new DifferenceBlendFunction(),
	"divide": new DivideBlendFunction(),
	"dst": new DstBlendFunction(),
	"exclusion": new ExclusionBlendFunction(),
	"hard-light": new HardLightBlendFunction(),
	"hard-mix": new HardMixBlendFunction(),
	"hue": new HueBlendFunction(),
	"invert": new InvertBlendFunction(),
	"invert-rgb": new InvertRGBBlendFunction(),
	"lighten": new LightenBlendFunction(),
	"linear-burn": new LinearBurnBlendFunction(),
	"linear-dodge": new LinearDodgeBlendFunction(),
	"linear-light": new LinearLightBlendFunction(),
	"luminosity": new LuminosityBlendFunction(),
	"mix": new MixBlendFunction(),
	"multiply": new MultiplyBlendFunction(),
	"negation": new NegationBlendFunction(),
	"overlay": new OverlayBlendFunction(),
	"pin-light": new PinLightBlendFunction(),
	"reflect": new ReflectBlendFunction(),
	"saturation": new SaturationBlendFunction(),
	"src": new SrcBlendFunction(),
	"screen": new ScreenBlendFunction(),
	"soft-light": new SoftLightBlendFunction(),
	"subtract": new SubtractBlendFunction(),
	"vivid-light": new VividLightBlendFunction()
};
