export default function appReducer(state, action) {
  switch (action.type) {
    case "SEARCH_BUSINESSES":
      return {
        ...state,
        total: action.payload.total,
        offset: state.offset + state.limit,
        businesses: [...state.businesses, ...action.payload.businesses],
        mapCenterCoords: {
          lat: action.payload.region.center.latitude,
        },
      };
  }
}
