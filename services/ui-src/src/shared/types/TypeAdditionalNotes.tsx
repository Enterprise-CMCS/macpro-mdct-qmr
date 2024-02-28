import * as DC from "dataConstants";

export interface AdditionalNotes {
  [DC.ADDITIONAL_NOTES]: string; // Additional notes or comments on the measure
  [DC.ADDITIONAL_NOTES_UPLOAD]: File[]; // Additional attachments upload
}
