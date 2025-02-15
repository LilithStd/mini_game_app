import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

export enum LOCATIONS_GROUP {
	FOREST = 'forest',
	SWAMP = 'swamp',
}

export type Location_content_type = {
	name: string;
	group: string;
	model: number;
};

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
	defaultState: boolean;
	locations: Location_content_type[];
	listLocations: () => string[];
	setDefaultState: () => void;
	getPullLocations: (location: string) => Location_content_type[];
}

export const useLocationStore = create<LocationStoreInterface>()(
	persist(
		(set, get) => ({
			defaultState: true,
			locations: LOCATION_CONTENT,
			listLocations: () => {
				return get().locations.map((item) => item.name);
			},
			setDefaultState: () => {
				set({
					defaultState: true,
					locations: LOCATION_CONTENT,
				});
			},
			getPullLocations: (location) => {
				return get().locations.filter((item) => item.group === location);
			},
		}),
		{
			name: 'location-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
