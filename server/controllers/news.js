import RSS from 'rss-to-json'

export const News = async (req, res, next) => {
    RSS.parse('https://www.nasa.gov/rss/dyn/breaking_news.rss').then(
        items1 => {
            res.json(items1.items)
        }
    )
}