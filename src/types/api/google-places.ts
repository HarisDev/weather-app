export interface AutocompleteInput {
  input: string;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface TextMatch {
  startOffset?: number;
  endOffset: number;
}

export interface FormattedText {
  text: string;
  matches?: TextMatch[];
}

export interface StructuredFormat {
  mainText: FormattedText;
  secondaryText: FormattedText;
}

export interface PlacePrediction {
  place: string;
  placeId: string;
  structuredFormat?: StructuredFormat;
}

export interface QueryPrediction {
  text: FormattedText;
  structuredFormat?: StructuredFormat;
}

export interface Suggestion {
  placePrediction?: PlacePrediction;
  queryPrediction?: QueryPrediction;
}

export interface AutocompleteOutput {
  suggestions: Suggestion[];
}

export interface Place {
  id: string;
  location: LatLng;
  displayName: string;
  formattedAddress: string;
}
