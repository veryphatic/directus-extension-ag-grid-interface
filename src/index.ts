import { ComponentOptions } from 'vue';
import { defineInterface } from '@directus/extensions-sdk';
import AgGridEditor from './components/AgGridEditor.vue';
import InterfaceOptions from './components/InterfaceOptions.vue';

export default defineInterface({
	id: 'veryphatic-handsontable',
	name: 'AG-Grid Interface',
	icon: 'table',
	description: 'JSON formatted AG Grid Interface',
	component: AgGridEditor,
	options: InterfaceOptions as ComponentOptions,
	types: ['json'],
	group: 'selection'
});
