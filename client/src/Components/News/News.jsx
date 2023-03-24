import { Component } from "react";

import axios from "../../AxiosConfig";
import NewsCard from "../NewsCard/NewsCard";

export default class News extends Component {
    state = { feed: [] }

    async componentDidMount() {
        try {
            const json = await axios.get('news')
            this.setState({ feed: json.data })
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const newscards = this.state.feed.map(item => <NewsCard title={item.title} link={item.link} key={item.link} />)
        return <div> <h3> Trending News <i className="fa-solid fa-rss"></i></h3>  {newscards}</div>
    }
}