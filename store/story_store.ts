import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE} from './global_store';

type VariantTextType = {
	en: string;
	ru: string;
	lv: string;
};

type CurrentLanguageVariantTextType = {
	content: string;
};

type PartType = {
	variantText: VariantTextType;
	background: number;
};

type PartTypeFiltred = {
	content: string;
	background: number;
};

export type StageType = 'start' | 'middle' | 'end';

type TextType = {
	stage: string;
	content: {
		[key: string]: PartType;
	};
};
type TextTypeFiltred = {
	stage: StageType;
	content: {
		[key: string]: PartTypeFiltred;
	};
};
type ContentTypeCurrentLanguage = {
	name: CHAPTER_LIST;
	text: {
		start: TextTypeFiltred;
		middle: TextTypeFiltred;
		end: TextTypeFiltred;
	};
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

export enum CHAPTER_LIST {
	ORIGIN = 'origin',
	FIRST = 'first',
	SECOND = 'second',
	THIRD = 'third',
}

const CHAPTER_CONTENT = [
	{
		name: CHAPTER_LIST.ORIGIN,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'You are returning from a neighboring town and seeing that it is already getting dark, you decide to take a shortcut by going through the forest.',
							ru: 'Вы возвращаетесь из соседнего города  и увидев что уже темнеет -  решили сократить дорогу пройдя через лес.',
							lv: 'Jūs atgriežaties no kaimiņpilsētas un, redzot, ka jau iestājas tumsa, nolemjat izvēlēties īsceļu, dodoties cauri mežam.',
						},
						background: require('../assets/backgrounds/monsters/background_without_imp.jpg'),
					},
					part_01: {
						variantText: {
							en: 'Walking through the forest, you hear noises around you, you look around and see that someone is standing behind a tree',
							ru: 'Идя по лесу вы слышите  шорохи вокруг, вы смотрите по сторонам и видите что за деревом кто-то стоит.',
							lv: 'Ejot pa mežu dzirdi šalkoņu apkārt, paskaties apkārt un redzi, ka aiz koka kāds stāv',
						},
						background: require('../assets/backgrounds/monsters/background_imp.jpg'),
					},
					part_02: {
						variantText: {
							en: 'You look closely and realize that there is a strange animal behind the tree, ',
							ru: 'Вы присматриваетесь и понимаете что за деревом странный зверь, ',
							lv: 'Jus paskaties cieši un saproti, ka aiz koka ir svešs dzīvnieks, ',
						},
						background: require('../assets/backgrounds/monsters/background_imp(zoom).jpg'),
					},
					part_03: {
						variantText: {
							en: 'It jumps out and comes at you, realizing that you won’t have time to get your weapon, you back away...',
							ru: 'Он выпрыгивает и идёт на вас , осознавая что не успеете достать оружие вы пятитесь назад...',
							lv: 'Tas izlec un nāk tev klāt, saprotot, ka tev nebūs laika dabūt ieroci, tu atkāpies...',
						},
						background: require('../assets/backgrounds/monsters/imp_story_start.jpg'),
					},
					part_04: {
						variantText: {
							en: 'A strange beast, seeing that you are retreating, makes a dash towards you',
							ru: 'Странный зверь видя что вы отступаете - делает рывок  вам навстречу',
							lv: 'Dīvains zvērs, redzot, ka jus atkāpies, met pretī',
						},
						background: require('../assets/backgrounds/monsters/imp_story_start_attack.jpg'),
					},
					part_05: {
						variantText: {
							en: 'You try to retreat further, but you understand that there was a hole behind you and, unable to stand on the edge, you fall down...',
							ru: 'Вы пытаетесь отступить дальше, но понимаете что сзади была яма и не устояв на краю вы падаете вниз...',
							lv: 'Jus mēģini atkāpties tālāk, bet saproti, ka aiz tevis bija bedre un, nespēdams nostāties uz malas, jus nokrīti...',
						},
						background: require('../assets/backgrounds/monsters/imp_story_start_fall.jpg'),
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'You dont remember well what happened before the fall, everything is blurry in your eyes, but you try to remember and with your hand on the floor you feel for the weapon, it reminds you that you...',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/backgrounds/cave/cave_00.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template test 1',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template test 2',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template teste 3',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template teste 4',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template teste 5',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template test end 1',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template test end 1',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template test end 2',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template test end 3',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template test end 4',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template test end 5',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
		},
		background: require('../assets/backgrounds/monsters/background_without_imp.jpg'),
	},
	{
		name: CHAPTER_LIST.FIRST,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'You are returning from a neighboring town and seeing that it is already getting dark, you decide to take a shortcut by going through the forest.',
							ru: 'Вы возвращаетесь из соседнего города  и увидев что уже темнеет -  решили сократить дорогу пройдя через лес.',
							lv: 'Jūs atgriežaties no kaimiņpilsētas un, redzot, ka jau iestājas tumsa, nolemjat izvēlēties īsceļu, dodoties cauri mežam.',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'You dont remember well what happened before the fall, everything is blurry in your eyes, but you try to remember and with your hand on the floor you feel for the weapon, it reminds you that you...',
							ru: '',
							lv: '',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
		},
		background: require('../assets/template/template_image.jpg'),
	},
	{
		name: CHAPTER_LIST.SECOND,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
		},
		background: require('../assets/template/template_image.jpg'),
	},
	{
		name: CHAPTER_LIST.THIRD,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_01: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_02: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_03: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_04: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
					part_05: {
						variantText: {
							en: 'template',
							ru: 'template',
							lv: 'template',
						},
						background: require('../assets/template/template_image.jpg'),
					},
				},
			},
		},
		background: require('../assets/template/template_image.jpg'),
	},
];

export interface StoryStoreInterface {
	defaultState: true;
	chapter: string;
	chapterContent: ContentType[];
	setChapter: (chapter: string) => void;
	setDefaultState: () => void;
	getChapterContent: (
		currentLanguage: LANGUAGE,
	) => ContentTypeCurrentLanguage | null;
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
				set({chapter: chapter});
			},
			getChapterContent: (currentLanguage) => {
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
						start: {
							stage: 'start',
							content: {
								part_00: getCurrentLanguageContent(
									chapter.text.start.content.part_00,
									currentLanguage,
								),
								part_01: getCurrentLanguageContent(
									chapter.text.start.content.part_01,
									currentLanguage,
								),
								part_02: getCurrentLanguageContent(
									chapter.text.start.content.part_02,
									currentLanguage,
								),
								part_03: getCurrentLanguageContent(
									chapter.text.start.content.part_03,
									currentLanguage,
								),
								part_04: getCurrentLanguageContent(
									chapter.text.start.content.part_04,
									currentLanguage,
								),
								part_05: getCurrentLanguageContent(
									chapter.text.start.content.part_05,
									currentLanguage,
								),
							},
						},

						middle: {
							stage: 'middle',
							content: {
								part_00: getCurrentLanguageContent(
									chapter.text.middle.content.part_00,
									currentLanguage,
								),
								part_01: getCurrentLanguageContent(
									chapter.text.middle.content.part_01,
									currentLanguage,
								),
								part_02: getCurrentLanguageContent(
									chapter.text.middle.content.part_02,
									currentLanguage,
								),
								part_03: getCurrentLanguageContent(
									chapter.text.middle.content.part_03,
									currentLanguage,
								),
								part_04: getCurrentLanguageContent(
									chapter.text.middle.content.part_04,
									currentLanguage,
								),
								part_05: getCurrentLanguageContent(
									chapter.text.middle.content.part_05,
									currentLanguage,
								),
							},
						},
						end: {
							stage: 'end',
							content: {
								part_00: getCurrentLanguageContent(
									chapter.text.end.content.part_00,
									currentLanguage,
								),
								part_01: getCurrentLanguageContent(
									chapter.text.end.content.part_01,
									currentLanguage,
								),
								part_02: getCurrentLanguageContent(
									chapter.text.end.content.part_02,
									currentLanguage,
								),
								part_03: getCurrentLanguageContent(
									chapter.text.end.content.part_03,
									currentLanguage,
								),
								part_04: getCurrentLanguageContent(
									chapter.text.end.content.part_04,
									currentLanguage,
								),
								part_05: getCurrentLanguageContent(
									chapter.text.end.content.part_05,
									currentLanguage,
								),
							},
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
