import axios from "axios";
import { ThreadContext } from "../context/contexts/threadContext";
import { SearchContext } from "../context/contexts/searchContext";
import { useContext } from 'react';
require("dotenv").config();


export default function CategoryActions() {
    const { dispatch: threadDispatch, threadData } = useContext(ThreadContext);
    const { dispatch: searchDispatch, searchData } = useContext(SearchContext);

    let headers = {};
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const API = axios.create({
        baseURL: baseURL,
        headers
    });


    async function getCategories() {
        const response = await API.get("/all")
        let data = response.data
        return data;
    }

    async function createThread(payload) {
        await API
            .post('/createThread', {
                title: payload.title,
                body: payload.body,
                category: payload.category,
            })
            .then(() => {
                console.log("data sent");
            })
            .catch(error => console.log(error));
    }

    async function fetchThreads(term) {

        try {
            console.log("firedddddddd", term)

            const response = await API.get('/fetchThreads', { params: { term: term } });
            let threads = response.data

            threadDispatch({ type: 'UPDATE_THREADS', threads: threads });
        } catch (error) {
            console.log(error)
        }

    }

    async function fetchCategoryImage(term) {

        try {
            console.log("IMAGE fired")
            const response = await API.get('/fetchCategoryImage', { params: { term: term } });
            let header = response.data
            console.log("HEADER", header)
            return header
        } catch (error) {
            console.log(error)
        }

    }


    async function fetchRecents(term) {

        try {
            console.log("fired term ", term)

            const response = await API.get('/fetchRecents', { params: { term: term } });
            let recents = response.data
            return recents

        } catch (error) {
            console.log(error)
        }

    }

    async function fetchThread(id) {

        try {
            console.log("FETCH THREAD FIRED", id)

            const response = await API.get('/fetchThread', { params: { id: id } });
            let recents = response.data
            return recents

        } catch (error) {
            console.log(error)
        }

    }


    async function createComment(payload) {
        await API
            .post('/createComment', {
                message: payload.comment,
                thread_id: payload.thread_id
            })
            .then(() => {
                console.log("comment created!");
            })
            .catch(error => console.log(error));
    }


    async function createReply(payload) {
        await axios
            .post('/createReply', {
                message: payload.message,
                comment_id: payload.comment_id,
                id: payload.thread_id
            })
            .then((res) => {
                console.log("new comments", res.data.comments)
                threadDispatch({ type: 'SET_COMMENTS', comments: res.data.comments })


            })
            .catch(error => console.log(error));
    }


    async function fetchTrends() {

        try {
            console.log("trending dropdown fired")

            const response = await API.get("/fetchTrends")
            let trendings = response.data
            return trendings

        } catch (error) {
            console.log(error)
        }
    }



    async function searchThreads(term) {

        try {
            console.log("term", term)

            const response = await API.get("/search", { params: { term: term } });
            searchDispatch({ type: 'SET_SEARCH_RESULTS', searchResults: response.data });


        } catch (error) {
            console.log(error)
        }

    }



    return {
        getCategories,
        createThread,
        fetchThreads,
        fetchCategoryImage,
        fetchRecents,
        fetchThread,
        createComment,
        createReply,
        fetchTrends,
        searchThreads
    }
}

