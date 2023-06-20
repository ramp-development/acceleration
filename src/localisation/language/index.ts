import type { Language } from '../type';

export const language = (): void => {
  // Get reference to language dropdown
  const languageSelect = document.querySelector<HTMLSelectElement>('[data-localise="language"]');

  // Stop execution if the language dropdown is not found
  if (!languageSelect) return;

  // Create an array of languages to be added to the dropdown
  const languages: Language[] = [
    {
      code: Weglot.options.language_from,
      name: Weglot.getLanguageName(Weglot.options.language_from),
    },
    ...Weglot.options.languages.map((language) => {
      return { code: language.language_to, name: Weglot.getLanguageName(language.language_to) };
    }),
  ];

  // Create and append the options to the language dropdown
  languages.forEach((language) => {
    const option = document.createElement('option');
    option.value = language.code;
    option.text = language.name;
    languageSelect.appendChild(option);
  });

  // Update Weglot's language when the selected option in the dropdown is changed
  languageSelect.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    Weglot.switchTo(target.value);
  });

  // Update the selected option in the dropdown when Weglot's language is changed
  Weglot.on('languageChanged', (newLanguageCode: string) => {
    languageSelect.value = newLanguageCode;
  });
};
