import {CHAPTER_LIST} from '@/store/story/storyTypes';

const defaultTemplateImage = require('../../../assets/template/template_image.jpg');

export const CHAPTER_CONTENT = [
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
						background: require('../../../assets/backgrounds/monsters/background_without_imp.jpg'),
					},
					part_01: {
						variantText: {
							en: 'Walking through the forest, you hear noises around you, you look around and see that someone is standing behind a tree',
							ru: 'Идя по лесу вы слышите  шорохи вокруг, вы смотрите по сторонам и видите что за деревом кто-то стоит.',
							lv: 'Ejot pa mežu dzirdi šalkoņu apkārt, paskaties apkārt un redzi, ka aiz koka kāds stāv',
						},
						background: require('../../../assets/backgrounds/monsters/background_imp.jpg'),
					},
					part_02: {
						variantText: {
							en: 'You look closely and realize that there is a strange animal behind the tree, ',
							ru: 'Вы присматриваетесь и понимаете что за деревом странный зверь, ',
							lv: 'Jus paskaties cieši un saproti, ka aiz koka ir svešs dzīvnieks, ',
						},
						background: require('../../../assets/backgrounds/monsters/background_imp(zoom).jpg'),
					},
					part_03: {
						variantText: {
							en: 'It jumps out and comes at you, realizing that you won’t have time to get your weapon, you back away...',
							ru: 'Он выпрыгивает и идёт на вас , осознавая что не успеете достать оружие вы пятитесь назад...',
							lv: 'Tas izlec un nāk tev klāt, saprotot, ka tev nebūs laika dabūt ieroci, tu atkāpies...',
						},
						background: require('../../../assets/backgrounds/monsters/imp_story_start.jpg'),
					},
					part_04: {
						variantText: {
							en: 'A strange beast, seeing that you are retreating, makes a dash towards you',
							ru: 'Странный зверь видя что вы отступаете - делает рывок  вам навстречу',
							lv: 'Dīvains zvērs, redzot, ka jus atkāpies, met pretī',
						},
						background: require('../../../assets/backgrounds/monsters/imp_story_start_attack.jpg'),
					},
					part_05: {
						variantText: {
							en: 'You try to retreat further, but you understand that there was a hole behind you and, unable to stand on the edge, you fall down...',
							ru: 'Вы пытаетесь отступить дальше, но понимаете что сзади была яма и не устояв на краю вы падаете вниз...',
							lv: 'Jus mēģini atkāpties tālāk, bet saproti, ka aiz tevis bija bedre un, nespēdams nostāties uz malas, jus nokrīti...',
						},
						background: require('../../../assets/backgrounds/monsters/imp_story_start_fall.jpg'),
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'You dont remember well what happened before the fall, everything is blurry before your eyes, you understand that you are in some kind of cave with weak lighting',
							ru: 'Вы плохо помните, что было до падения, всё расплывчато перед глазами, вы понимаете что находитесь в какой то пещере со слабым освещением',
							lv: 'Jus labi neatceries, kas notika pirms kritiena, viss ir miglains jusu acu priekšā, jus saproti, ka atrodies kaut kādā alā ar vāju apgaismojumu.',
						},
						background: require('../../../assets/backgrounds/cave/cave_00.jpg'),
					},
					part_01: {
						variantText: {
							en: 'Realizing that the path is only forward, you make several steps deep into the cave',
							ru: 'Понимая что путь есть только вперёд , вы делаете несколько шагов вглубь пещеры',
							lv: 'Saprotot, ka vienīgais ceļš ir uz priekšu, jūs sperat dažus soļus dziļāk alā.',
						},
						background: require('../../../assets/backgrounds/cave/cave_01.jpg'),
					},
					part_02: {
						variantText: {
							en: 'You wander among identical rooms and corridors for a long time',
							ru: 'Вы блуждаете среди одинаковых комнат и коридоров уже долгое время',
							lv: 'Jus jau ilgu laiku esam klaiņojis pa vienām un tām pašām istabām un koridoriem.',
						},
						background: require('../../../assets/backgrounds/cave/cave_03.jpg'),
					},
					part_03: {
						variantText: {
							en: 'Sometimes, while taking a break, you hear a terrible growl deep in the corridors',
							ru: 'Иногда, делая привалы, чтобы отдохнуть, вы слышите грозное рычание где то глубоко в коридорах',
							lv: 'Reizēm, apstājoties atpūsties, kaut kur dziļi koridoros dzirdama draudīga rūkšana.',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'Another roar echoes through the corridors, now he is already quite close to you, fear grips you, but without losing your self-control, tightly clutching your weapon, you walk away from loud, icy blood, animal sounds.',
							ru: 'Очередной рык эхом распространяется по коридорам, теперь он уже совсем рядом с вами, страх охватывает вас, но не теряя самообладания , крепко сжимая оружие вы идёте в сторону громких, леденящих кровь, звериных звуков.',
							lv: 'Vēl viens rēciens atskan cauri koridoriem, tagad tas ir pavisam tuvu, bailes tevi pārņem, bet, nezaudējot savaldību, cieši turot ieroci, tu ej pretī skaļajām, asinis stindzinošajām, dzīvnieku skaņām.',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'Coming closer and closer to the source of the animal sounds, you see a large shadow, and it is definitely not a wild predator from the forest, you have heard about them only from urban legends, but it seems to have noticed you...',
							ru: 'Подходя всё ближе к источнику звериных звуков, вы видите большую тень, и это точно не дикий хищник из леса, вы слышали про них только из городских легенд, но вот оно кажется заметило вас...',
							lv: 'Tuvojoties arvien tuvāk dzīvnieku skaņu avotam, jūs redzat lielu ēnu, un tas noteikti nav savvaļas plēsējs no meža, jūs par tiem esat dzirdējuši tikai no pilsētu leģendām, bet šķiet, ka tas jūs ir pamanījis...',
						},
						background: defaultTemplateImage,
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
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template test end 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template test end 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template test end 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template test end 4',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template test end 5',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
		},
		background: require('../../../assets/backgrounds/monsters/background_without_imp.jpg'),
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
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'You dont remember well what happened before the fall, everything is blurry in your eyes, but you try to remember and with your hand on the floor you feel for the weapon, it reminds you that you...',
							ru: '',
							lv: '',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 1',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
		},
		background: defaultTemplateImage,
	},
	{
		name: CHAPTER_LIST.SECOND,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 2',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
		},
		background: defaultTemplateImage,
	},
	{
		name: CHAPTER_LIST.THIRD,
		text: {
			start: {
				stage: 'start',
				content: {
					part_00: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},

			middle: {
				stage: 'middle',
				content: {
					part_00: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
			end: {
				stage: 'end',
				content: {
					part_00: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_01: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_02: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_03: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_04: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
					part_05: {
						variantText: {
							en: 'template 3',
							ru: 'template',
							lv: 'template',
						},
						background: defaultTemplateImage,
					},
				},
			},
		},
		background: defaultTemplateImage,
	},
];
