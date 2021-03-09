import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const LoadingSkeleton = () => {
  return (
    <SkeletonTheme color="#6b516d" highlightColor="#6b516d">
      <Skeleton count={10} />
    </SkeletonTheme>
  )
}

export default LoadingSkeleton
