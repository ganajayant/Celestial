import RSS from 'rss-to-json'

export const News = async (req, res, next) => {
    RSS.parse('https://www.nasa.gov/rss/dyn/breaking_news.rss').then(
        items1 => {
            res.json(items1.items)
        }
    )
    // RSS.parse('https://www.nasa.gov/rss/dyn/breaking_news.rss').then(
    //     items1 => {
    //         RSS.parse('https://www.space.com/feeds/all').then(
    //             items2 => {
    //                 let ar1 = items1.items;
    //                 let ar2 = items2.items;
    //                 let ar3 = ar1.concat(ar2);
    //                 res.json(ar3)
    //             }
    //         )
    //     }
    // )

}