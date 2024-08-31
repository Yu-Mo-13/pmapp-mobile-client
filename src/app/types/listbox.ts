export type ListboxProps = {
  id: string;
  optionItems: string[];
  isEnabled: boolean;
  isWidemode: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};