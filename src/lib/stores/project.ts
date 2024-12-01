import { writable } from 'svelte/store';

export const selectedLocale = writable('en');

export const setSelectedLocale = (locale: string) => {
	selectedLocale.set(locale);
};
