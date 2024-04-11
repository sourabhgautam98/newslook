function NewsItem({ item }) {
    return (
      <a href={item.url} className="article" target="_blank"  rel="noreferrer">
        <div className="article-image">
          <img src={!item.urlToImage ? "https://media.cnn.com/api/v1/images/stellar/prod/laken2.jpg?c=16x9&q=w_800,c_fill" : item.urlToImage} alt={item.title}  />
        </div>
        <div className="article-content">
          <div className="article-source">
            <span>{item.source.name}</span>
          </div>
          <div className="article-title">
            <h2>{item.title}</h2>
          </div>
          <p className="article-description">{item.description}</p>
          <div className="article-details">
            <h2>Time & Date: {item.publishedAt}</h2>
            <h2>Author: {!item.author ? "Unknown" :item.author}</h2> 
          </div>
        </div>
      </a>
    );
  }
  
  export default NewsItem;
  