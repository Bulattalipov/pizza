import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={456}
    viewBox="0 0 280 456"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="124" />
    <rect x="0" y="265" rx="6" ry="6" width="280" height="24" />
    <rect x="0" y="309" rx="10" ry="10" width="280" height="84" />
    <rect x="0" y="419" rx="0" ry="0" width="90" height="27" />
    <rect x="125" y="410" rx="30" ry="30" width="152" height="44" />
  </ContentLoader>
)

export default Skeleton;