import { ComponentOptions } from 'vue';
import { defineInterface } from '@directus/extensions-sdk';
import AgGridEditor from './components/AgGridEditor.vue';
import InterfaceOptions from './components/InterfaceOptions.vue';

export default defineInterface({
	id: 'veryphatic-ag-grid',
	name: 'AG-Grid Interface',
	icon: 'table',
	description: 'JSON AG-Grid Interface',
	component: AgGridEditor,
	options: InterfaceOptions as ComponentOptions,
	types: ['json'],
	group: 'selection'
});
