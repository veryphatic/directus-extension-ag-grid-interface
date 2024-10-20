import { throttle } from 'lodash';
import { onBeforeMount, onMounted, onUnmounted, ref, Ref } from 'vue';

type WindowSizeOptions = {
	throttle: number;
};

// source https://github.com/directus/directus/blob/75080fa20b8a5dd27964862fd163fa8c275e11b9/app/src/composables/use-window-size.ts

export function useWindowSize(options: WindowSizeOptions = { throttle: 100 }): {
	width: Ref<number>;
	height: Ref<number>;
} {
	const width = ref(0);
	const height = ref(0);

	const setSize = () => {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	};

	const onResize = throttle(setSize, options.throttle);

	onBeforeMount(setSize);

	onMounted(() => {
		window.addEventListener('resize', onResize, { passive: true });
	});

	onUnmounted(() => {
		window.removeEventListener('resize', onResize);
	});

	return { width, height };
}
