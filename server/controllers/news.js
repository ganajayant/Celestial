import RSS from 'rss-to-json'

export const News = async (req, res, next) => {
    RSS.parse('https://www.nasa.gov/rss/dyn/breaking_news.rss').then(
        data => {
            res.status(200).json(data.items)
        }
    ).catch(err => {
        res.status(500).json({ message: err.message })
    })
}