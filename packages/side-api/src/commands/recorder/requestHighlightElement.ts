import { LocatorFields } from '../../types/base'

/**
 * Asks the playback windows to set the next element clicked as the currently
 * selected locator field element.
 */
export type Shape = (fieldName: LocatorFields) => Promise<void>
