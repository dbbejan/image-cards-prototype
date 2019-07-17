import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MORE_ITEMS_REQUEST, loadMoreItemsSuccess, loadMoreItemsFailure } from './redux';
const API_URL = 'https://picsum.photos';
const size = 250;
const limit = 30;

const fetchPhotos = (page) => {
    return axios.get(`${API_URL}/v2/list?page=${page}&limit=${limit}`)
}

const makeUniqueIdGenerator = () => {
    let i = 0;
    return function () {
        return i++;
    }
}

const generateUniqueId = makeUniqueIdGenerator();

function* loadMoreItems(action) {
    const { payload } = action;
    try {
        const response = yield call(fetchPhotos, payload.page);
        yield put(loadMoreItemsSuccess(response.data.map(item => ({ id: generateUniqueId(), author: item.author, download_url: `${API_URL}/id/${item.id}/${size}` }))));
    }
    catch (error) {
        yield put(loadMoreItemsFailure(error.message))
    }
}

function* rootSaga() {
    yield takeLatest(LOAD_MORE_ITEMS_REQUEST, loadMoreItems);
}

export default rootSaga;