import { AutocompleteOption } from "@/types/user";

export interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  fetchOptions: (query: string) => Promise<AutocompleteOption[]>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface MultiAutocompleteProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (values: string[]) => void;
  fetchOptions: (query: string) => Promise<AutocompleteOption[]>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
