import { ComponentOptions } from 'vue';
import { defineInterface } from '@directus/extensions-sdk';
import HandsontableInterface from './components/HandsontableInterface.vue';
import InterfaceOptions from './components/InterfaceOptions.vue';

export default defineInterface({
	id: 'veryphatic-handsontable',
	name: 'Handsontable Interface',
	icon: 'table',
	description: 'JSON formatted Handsontable Interface',
	component: HandsontableInterface,
	options: InterfaceOptions as ComponentOptions,
	types: ['json'],
	group: 'selection'
});
