export interface IRequestBase {
  /**
   * API Token for read/write access
   */
  api_token: string;
  /**
   * Project ID
   */
  id: string;

  /**
   * Payloads are converted to JSON string
   */
  data: string;
}

export interface TermDto {
  term   : string;
  context: string;
}

export interface TermDtoToUpdate {
  term       : string;
  context    : string;
  new_term   : string;
  new_context: string;
}

export type DataToAddTerms = Array<TermDto>;
export type DataToUpdateTerms = Array<TermDtoToUpdate>;
export type DataToDeleteTerms = Array<TermDto>;

export type InputToUpdateTerms = Array<{ key: string; new_key: string;}>;
