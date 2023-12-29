/**
 * A timer that provides read access to time data.
 *
 * @group Utils
 */

export interface ImmutableTimer {

	/**
	 * Returns the current delta time in seconds.
	 */

	getDelta(): number;

	/**
	 * Returns the fixed delta time in seconds.
	 */

	getFixedDelta(): number;

	/**
	 * Returns the elapsed time in seconds.
	 */

	getElapsed(): number;

}
