import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE} from '../global_store';
import {CHAPTER_CONTENT} from '@/constants/store/items/stories';
import {CHAPTER_LIST} from './storyTypes';

// type VariantTextType = {
// 	en: string;
// 	ru: string;
// 	lv: string;
// };

type SupportedLanguage = 'en' | 'ru' | 'lv';
export type StageType = 'start' | 'middle' | 'end';
// Тип многоязычного текста
type VariantTextType = {
	[lang in SupportedLanguage]: string;
};

type ChapterPartKey =
	| 'part_00'
	| 'part_01'
	| 'part_02'
	| 'part_03'
	| 'part_04'
	| 'part_05';

type ChapterText = {
	[key in StageType]?: ChapterStage;
};

type ChapterPart = {
	content: string;
	background: number;
};

type ChapterContent = {
	part_00: ChapterPart;
	part_01: ChapterPart;
	part_02: ChapterPart;
	part_03: ChapterPart;
	part_04: ChapterPart;
	part_05: ChapterPart;
};

type Chapter = {
	name: string;
	text: ChapterText;
	background: string;
};

type ChapterStage = {
	stage: StageType;
	content: ChapterContent;
};

type PartType = {
	variantText: VariantTextType;
	background: number;
};

type PartTypeFiltred = {
	content: string;
	background: number;
};

type TextType = {
	stage: string;
	content: {
		[key: string]: PartType;
	};
};
type TextTypeFiltred = {
	stage: StageType;
	content: ChapterContent;
};
type ContentTypeCurrentLanguage = {
	name: CHAPTER_LIST;
	text: TextTypeFiltred;
	background: number;
};
type ContentType = {
	name: CHAPTER_LIST;
	text: {
		start: TextType;
		middle: TextType;
		end: TextType;
	};
	background: number;
};
type ChapterPartFiltered = {
	content: string;
	background: number;
};

type ChapterContentFiltered = {
	part_00: ChapterPartFiltered;
	part_01: ChapterPartFiltered;
	part_02: ChapterPartFiltered;
	part_03: ChapterPartFiltered;
	part_04: ChapterPartFiltered;
	part_05: ChapterPartFiltered;
};
type ChapterTextFiltered = {
	stage: StageType;
	content: ChapterContentFiltered;
};
export type GetChapterContentReturnType = {
	name: CHAPTER_LIST;
	text: ChapterTextFiltered;
	background: number;
} | null;

export interface StoryStoreInterface {
	defaultState: boolean;
	chapter: string;
	chapterContent: ContentType[];
	setChapter: (chapter: string) => void;
	setDefaultState: () => void;
	getChapterContent: (
		stage: StageType,
		currentLanguage: LANGUAGE,
	) => GetChapterContentReturnType | null;
}

// Zustand-хранилище
export const useStoryStore = create<StoryStoreInterface>()(
	persist(
		(set, get) => ({
			defaultState: true,
			chapter: CHAPTER_LIST.ORIGIN,
			chapterContent: CHAPTER_CONTENT,
			setDefaultState: () => {
				set({
					defaultState: true,
					chapter: CHAPTER_LIST.ORIGIN,
				});
			},
			setChapter: (chapter) => {
				set({
					defaultState: false,
					chapter: chapter,
				});
			},
			getChapterContent: (
				stage: StageType,
				currentLanguage: LANGUAGE,
			): ContentTypeCurrentLanguage | null => {
				const currentContent = get().chapterContent;
				const chapter = currentContent.find(
					(item) => item.name === get().chapter,
				);

				if (!chapter) return null;

				const getCurrentLanguageContent = (
					part: PartType,
					lang: LANGUAGE,
				): {content: string; background: number} => ({
					content: part.variantText[lang],
					background: part.background,
				});

				return {
					name: chapter.name,
					text: {
						stage: stage,
						content: {
							part_00: getCurrentLanguageContent(
								chapter.text[stage].content.part_00,
								currentLanguage,
							),
							part_01: getCurrentLanguageContent(
								chapter.text[stage].content.part_01,
								currentLanguage,
							),
							part_02: getCurrentLanguageContent(
								chapter.text[stage].content.part_02,
								currentLanguage,
							),
							part_03: getCurrentLanguageContent(
								chapter.text[stage].content.part_03,
								currentLanguage,
							),
							part_04: getCurrentLanguageContent(
								chapter.text[stage].content.part_04,
								currentLanguage,
							),
							part_05: getCurrentLanguageContent(
								chapter.text[stage].content.part_05,
								currentLanguage,
							),
						},
					},
					background: chapter.background,
				};
			},
		}),
		{
			name: 'story-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
