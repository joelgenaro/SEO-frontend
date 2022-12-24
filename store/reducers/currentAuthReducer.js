const initState = {
  loading: false,
  data: null,
  apiRoute: "index",
  countries: null,
  sectorOne: null,
  sectorTwo: null,
  links: null,
  title: '',
  page: 1,
};

const currentAuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_LOADING":
      return { ...state, loading: action.payload };
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    case "UPDATE_API_ROUTE":
      return { ...state, apiRoute: action.payload };
    case "UPDATE_COUNTRIES":
      return { ...state, countries: action.payload };
    case "UPDATE_SECTOR_ONE":
      return { ...state, sectorOne: action.payload };
    case "UPDATE_SECTOR_TWO":
      return { ...state, sectorTwo: action.payload };
    case "UPDATE_LINKS":
      return { ...state, links: action.payload };
    case "UPDATE_PAGE":
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

export default currentAuthReducer;
