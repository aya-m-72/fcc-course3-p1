import { useEffect } from "react"
import { getData, getAQuote } from "./features/quoteSlice"
import { useDispatch, useSelector } from "react-redux"

function App() {
  const dispatch = useDispatch()
  const { isLoading, isError, quote, color } = useSelector(
    (state) => state.quote
  )
  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <div
      className="layout"
      style={{ backgroundColor: color, transition: "all 1s ease-in-out" }}
    >
      <div id="quote-box">
        {isLoading ? (
          <h1 style={{ color: color, transition: "all 1s ease-in-out" }}>Loading...</h1>
        ) : isError ? (
          <h1 style={{ color: color, transition: "all 1s ease-in-out" }}>{isError}</h1>
        ) : (
          <>
            <h1
              id="text"
              style={{ color: color, transition: "all 1s ease-in-out" }}
            >
              <i className="fa fa-quote-left" id="quote-mark" />
              {quote.quote}
            </h1>
            <p
              id="author"
              style={{ color: color, transition: "all 1s ease-in-out" }}
            >
              -{quote.author}
            </p>
          </>
        )}
        <div className="btn-container">
          <a
            style={{
              backgroundColor: color,
              transition: "all 1s ease-in-out",
            }}
            href={
              quote &&
              "twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                encodeURIComponent('"' + quote.quote + '"' + quote.author)
            }
            id="tweet-quote"
            className="btn"
            target="_blank"
          >
            <i className="fa fa-twitter" />
          </a>
          <a
            style={{
              backgroundColor: color,
              transition: "all 1s ease-in-out",
            }}
            href={
              quote &&
              "https://www.tumblr.com/widgets/share/tool?posttype=quotes&tags=quotes,freecodecamp&caption=" +
                encodeURIComponent(quote.author) +
                "&content=" +
                encodeURIComponent(quote.quote) +
                "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbutton&shareSource=tumblr_share_button"
            }
            id="tumblr-share"
            className="btn"
            target="_blank"
          >
            <i className="fa fa-tumblr" />
          </a>
          <button
            style={{
              backgroundColor: color,
              transition: "all 1s ease-in-out",
            }}
            id="new-quote"
            className="btn"
            onClick={() => dispatch(getAQuote())}
          >
            New quote
          </button>
        </div>
      </div>
      <footer>
        <p>by Aya M.</p>
      </footer>
    </div>
  )
}

export default App
