import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

enum LOCATIONS_GROUP {
	FOREST = 'forest',
	SWAMP = 'swamp',
}

const LOCATION_CONTENT = [
	{
		name: 'name_1',
		group: LOCATIONS_GROUP.FOREST,
		model: require('../assets/location/forest/location_05.png'),
	},
	{
		name: 'name_2',
		group: LOCATIONS_GROUP.FOREST,
		model: require('../assets/location/forest/location_06.png'),
	},
	{
		name: 'name_3',
		group: LOCATIONS_GROUP.FOREST,
		model: require('../assets/location/forest/location_07.png'),
	},
	{
		name: 'name_4',
		group: LOCATIONS_GROUP.FOREST,
		model: require('../assets/location/forest/location_08.png'),
	},
	{
		name: 'name_5',
		group: LOCATIONS_GROUP.SWAMP,
		model: require('../assets/location/swamp/location_01.png'),
	},
	{
		name: 'name_6',
		group: LOCATIONS_GROUP.SWAMP,
		model: require('../assets/location/swamp/location_02.png'),
	},
	{
		name: 'name_7',
		group: LOCATIONS_GROUP.SWAMP,
		model: require('../assets/location/swamp/location_03.png'),
	},
	{
		name: 'name_8',
		group: LOCATIONS_GROUP.SWAMP,
		model: require('../assets/location/swamp/location_04.png'),
	},
];

export interface LocationStoreInterface {
	location: [];
}

export const useEnemyStore = create<LocationStoreInterface>()(
	persist(
		(set, get) => ({
			location: [],
		}),
		{
			name: 'location-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
