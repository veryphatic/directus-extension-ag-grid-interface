import { ComponentOptions } from 'vue';
import { defineInterface } from '@directus/extensions-sdk';
import HandsontableInterface from './components/HandsontableInterface.vue';
import InterfaceOptions from './components/InterfaceOptions.vue';

export default defineInterface({
	id: 'veryphatic-handsontable',
	name: 'AG-Grid Interface',
	icon: 'table',
	description: 'JSON formatted AG Grid Interface',
	component: HandsontableInterface,
	options: InterfaceOptions as ComponentOptions,
	types: ['json'],
	group: 'selection'
});
