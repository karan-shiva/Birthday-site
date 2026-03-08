import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaFileAlt, FaCode, FaUser, FaClock } from 'react-icons/fa'
import styles from './WishWheel.module.css'

const birthdayMessage =
  "Wishing you the most wonderful birthday, Yuga! May this special day be filled with all the love, laughter, and joy you deserve. You are such an incredible person who brings light to everyone around you.\n\nHere's to another year of beautiful adventures, endless laughter, and memories that last a lifetime. May all your dreams come true today and always!"

const timelineData = [
  {
    id: 1,
    title: 'Yuga',
    date: 'Jan 2024',
    content: birthdayMessage,
    icon: FaCalendar,
    image: '/profile.jpeg',
    wishImage: '/wish.jpeg',
    relatedIds: [2],
    energy: 100,
  },
  {
    id: 2,
    title: 'Yuga',
    date: 'Feb 2024',
    content: birthdayMessage,
    icon: FaFileAlt,
    image: '/profile.jpeg',
    wishImage: '/wish.jpeg',
    relatedIds: [1, 3],
    energy: 90,
  },
  {
    id: 3,
    title: 'Yuga',
    date: 'Mar 2024',
    content: birthdayMessage,
    icon: FaCode,
    image: '/profile.jpeg',
    wishImage: '/wish.jpeg',
    relatedIds: [2, 4],
    energy: 60,
  },
  {
    id: 4,
    title: 'Yuga',
    date: 'Apr 2024',
    content: birthdayMessage,
    icon: FaUser,
    image: '/profile.jpeg',
    wishImage: '/wish.jpeg',
    relatedIds: [3, 5],
    energy: 30,
  },
  {
    id: 5,
    title: 'Yuga',
    date: 'May 2024',
    content: birthdayMessage,
    icon: FaClock,
    image: '/profile.jpeg',
    wishImage: '/wish.jpeg',
    relatedIds: [4],
    energy: 10,
  },
]

const calcPosition = (index, total, rotation, radius = 200) => {
  const angle = ((index / total) * 360 + rotation) % 360
  const radian = (angle * Math.PI) / 180
  return {
    x: radius * Math.cos(radian),
    y: radius * Math.sin(radian),
    angle,
    zIndex: Math.round(100 + 50 * Math.cos(radian)),
    opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
  }
}

export default function WishWheel({ onOpenShop }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState({})
  const [activeNodeId, setActiveNodeId] = useState(null)

  const containerRef = useRef(null)
  const orbitRef = useRef(null)
  const nodeRefs = useRef({})
  const wishCardRef = useRef(null)
  const rotationAngleRef = useRef(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const expandedItemsRef = useRef({})
  const currentRadiusRef = useRef(270)
  const targetRadiusRef = useRef(270)
  const expandedAnglesRef = useRef({})
  const activeNodeIdRef = useRef(null)

  useEffect(() => {
    expandedItemsRef.current = expandedItems
  }, [expandedItems])

  useEffect(() => {
    activeNodeIdRef.current = activeNodeId
  }, [activeNodeId])

  const collapse = useCallback(() => {
    setExpandedItems({})
    setActiveNodeId(null)
    setPulseEffect({})
    setAutoRotate(true)
    targetRadiusRef.current = 270
    Object.keys(expandedAnglesRef.current).forEach(
      (k) => delete expandedAnglesRef.current[parseInt(k)]
    )
  }, [])

  // Collapse on any click outside nodes or wish card
  useEffect(() => {
    const handleDocClick = (e) => {
      if (activeNodeIdRef.current === null) return
      const clickedNode = Object.values(nodeRefs.current).some(
        (el) => el && el.contains(e.target)
      )
      const clickedCard = wishCardRef.current?.contains(e.target)
      if (!clickedNode && !clickedCard) collapse()
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [collapse])

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      collapse()
    }
  }

  const getRelatedItems = (itemId) => {
    const item = timelineData.find((d) => d.id === itemId)
    return item ? item.relatedIds : []
  }

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false
      })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const relatedItems = getRelatedItems(id)
        const newPulseEffect = {}
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true })
        setPulseEffect(newPulseEffect)

        const nodeIndex = timelineData.findIndex((item) => item.id === id)
        const { angle } = calcPosition(
          nodeIndex,
          timelineData.length,
          rotationAngleRef.current,
          currentRadiusRef.current
        )
        expandedAnglesRef.current[id] = angle
        targetRadiusRef.current = 350
      } else {
        collapse()
      }

      return newState
    })
  }

  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp
      const delta = Math.min(timestamp - lastTimeRef.current, 100)
      lastTimeRef.current = timestamp

      if (autoRotate) {
        rotationAngleRef.current = (rotationAngleRef.current + (delta / 50) * 0.3) % 360
      }

      const dr = targetRadiusRef.current - currentRadiusRef.current
      if (Math.abs(dr) > 0.1) {
        currentRadiusRef.current += dr * (1 - Math.exp(-delta / 200))
      } else {
        currentRadiusRef.current = targetRadiusRef.current
      }

      timelineData.forEach((item, index) => {
        const el = nodeRefs.current[item.id]
        if (!el) return

        if (expandedItemsRef.current[item.id]) {
          const frozenAngle = expandedAnglesRef.current[item.id]
          if (frozenAngle !== undefined) {
            const radian = (frozenAngle * Math.PI) / 180
            const x = currentRadiusRef.current * Math.cos(radian)
            const y = currentRadiusRef.current * Math.sin(radian)
            el.style.transform = `translate(${x}px, ${y}px)`
          }
          el.style.zIndex = '200'
          el.style.opacity = '1'
        } else {
          const { x, y, zIndex, opacity } = calcPosition(
            index,
            timelineData.length,
            rotationAngleRef.current,
            currentRadiusRef.current
          )
          el.style.transform = `translate(${x}px, ${y}px)`
          el.style.zIndex = String(zIndex)
          el.style.opacity = String(opacity)
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [autoRotate])

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const activeItem = activeNodeId !== null
    ? timelineData.find((i) => i.id === activeNodeId)
    : null

  return (
    <section id="wishwheel" className={styles.section}>
      <div
        className={styles.orbitContainer}
        ref={containerRef}
        onClick={handleContainerClick}
      >
        <div
          className={styles.orbitArea}
          ref={orbitRef}
        >
          {/* Center text */}
          {!activeItem && (
            <div className={styles.centerText}>
              <p className={styles.eyebrow}>From everyone who loves you</p>
              <h2 className={styles.centerHeading}>Birthday Wishes</h2>
              <p className={styles.hint}>Click a node to read a wish</p>
            </div>
          )}

          {/* Orbit track ring */}
          <div
            className={styles.orbitRing}
            style={{
              width: activeNodeId !== null ? 740 : 580,
              height: activeNodeId !== null ? 740 : 580,
            }}
          />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calcPosition(index, timelineData.length, rotationAngleRef.current, currentRadiusRef.current)
            const isExpanded = !!expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = !!pulseEffect[item.id]
            const Icon = item.icon

            const glowSize = item.energy * 0.5 + 70
            const glowOffset = -(glowSize - 88) / 2

            const circleStyle = {
              transform: isExpanded ? 'scale(1.5)' : undefined,
              borderColor: isExpanded
                ? 'rgba(255,255,255,0.9)'
                : isRelated
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(255,255,255,0.4)',
              boxShadow: isExpanded
                ? '0 0 20px rgba(167,139,250,0.6), 0 0 40px rgba(167,139,250,0.2)'
                : isRelated
                ? '0 0 12px rgba(255,255,255,0.3)'
                : undefined,
              background: isExpanded
                ? 'rgba(255,255,255,0.15)'
                : 'var(--glass-bg)',
              animation: isPulsing ? 'nodePulse 1s ease-in-out infinite' : undefined,
            }

            const labelStyle = {
              color: isExpanded ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)',
              transform: isExpanded
                ? 'translateX(-50%) scale(1.2)'
                : 'translateX(-50%)',
              top: isExpanded ? '122px' : undefined,
            }

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el }}
                className={styles.node}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
              >
                {/* Energy glow halo */}
                <div
                  className={styles.nodeGlow}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)',
                    width: `${glowSize}px`,
                    height: `${glowSize}px`,
                    left: `${glowOffset}px`,
                    top: `${glowOffset}px`,
                  }}
                />

                {/* Node circle */}
                <div className={styles.nodeCircle} style={circleStyle}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <Icon size={20} color="white" />
                  )}
                </div>

                {/* Label */}
                <div className={styles.nodeLabel} style={labelStyle}>
                  {item.title}
                </div>
              </div>
            )
          })}

          {/* Center wish card */}
          {activeItem && (
            <div
              ref={wishCardRef}
              className={`${styles.wishCard} glass`}
              onClick={(e) => e.stopPropagation()}
              style={{ borderTop: '2px solid var(--accent-purple)' }}
            >
              {activeItem.wishImage && (
                <img
                  src={activeItem.wishImage}
                  alt="Birthday wish"
                  className={styles.wishCardImg}
                />
              )}
              <div className={styles.wishCardBody}>
                <p className={styles.wishCardTitle}>{activeItem.title}</p>
                {activeItem.content.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.wishCardText}>{para}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.button
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenShop}
        >
          Surprise
        </motion.button>
      </div>
    </section>
  )
}
