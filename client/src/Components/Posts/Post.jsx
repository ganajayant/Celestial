import axios from "axios";
import { Component } from "react";

import PostCard from "../PostCard/PostCard";

export default class Posts extends Component {
    state = { posts: [] }
    async componentDidMount() {
        try {
            const json = await axios.get('http://localhost:5000/post')
            this.setState({ posts: json.data })
        } catch (error) {

        }
    }
    getRelativeTime(time) {
        const now = new Date();
        const diff = Math.abs(time - now);
        const mark = (time - now) >> -1 || 1;

        if (diff === 0) return new Intl.RelativeTimeFormat('en').format(0, "second");

        const times = [
            { type: 'second', seconds: 1000 },
            { type: 'minute', seconds: 60 * 1000 },
            { type: 'hour', seconds: 60 * 60 * 1000 },
            { type: 'day', seconds: 24 * 60 * 60 * 1000 },
            { type: 'week', seconds: 7 * 24 * 60 * 60 * 1000 },
            { type: 'month', seconds: 30 * 24 * 60 * 60 * 1000 },
            { type: 'year', seconds: 12 * 30 * 24 * 60 * 60 * 1000 },
        ];

        let params = [];
        for (let t of times) {
            const segment = Math.round(diff / t.seconds);
            if (segment >= 0 && segment < 10) {
                params = [(segment * mark) | 0, t.type];
                break;
            }
        }
        return new Intl.RelativeTimeFormat('en').format(...params);
    }

    render() {
        const postcards = this.state.posts.reverse().map(item => <PostCard key={item._id} url={item.ImageURL} caption={item.Caption} likes={item.Likes} userid={item.Userid} time={this.getRelativeTime(new Date(item.createdAt))} />)
        return postcards
    }
}