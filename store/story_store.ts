import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Content_Type = {
	name: string;
	text: string;
	background: number;
};

export interface StoryStoreInterface {
	chapter: string;
	setChapter: (chapter: string) => void;
	getChapterContent: () => Content_Type | null;
}

enum CHAPTER_LIST {
	ORIGIN = 'origin',
	FIRST = 'first',
	SECOND = 'second',
	THIRD = 'third',
}

const CHAPTER_CONTENT: {[key: string]: string} = {
	origin:
		'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. ',

	first:
		'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',

	second:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',

	third:
		't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
};

const CHAPTER_CONTENT_2 = [
	{
		name: CHAPTER_LIST.ORIGIN,
		text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. ',
		background: require('../assets/backgrounds/test_bg.png'),
	},
	{
		name: CHAPTER_LIST.FIRST,
		text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
		background: require('../assets/backgrounds/bg_1.jpg'),
	},
	{
		name: CHAPTER_LIST.SECOND,
		text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
		background: require('../assets/backgrounds/bg_2.jpg'),
	},
	{
		name: CHAPTER_LIST.THIRD,
		text: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
		background: require('../assets/backgrounds/bg_3.jpg'),
	},
];

// Zustand-хранилище
export const useStoryStore = create<StoryStoreInterface>()(
	persist(
		(set, get) => ({
			chapter: CHAPTER_LIST.FIRST,
			setChapter: (chapter) => {
				set({chapter});
			},
			getChapterContent: () => {
				return (
					CHAPTER_CONTENT_2.find((item) => item.name === get().chapter) || null
				);
			},
		}),
		{
			name: 'story-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
