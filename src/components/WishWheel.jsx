import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaFileAlt, FaCode, FaUser, FaClock } from 'react-icons/fa'
import styles from './WishWheel.module.css'

const timelineData = [
  {
    id: 1,
    title: 'Anirudh',
    date: 'Jan 2024',
    content: "Happy birthday Yuga!!!\n\nIt feels like yesterday that we were batchmates during our under grad days, somehow surviving classes, postings and the chaos of med school. Over the years, you've been one of the most supportive and dependable friends that I've had. Especially recently, when things got messy for me, you were really there, being honest, helping me see things clearly and making sure I got through that phase. I'm really grateful for that and for always looking out for me. I will also make sure I'm there for you if you need anything.\n\nI'm looking forward to more trips and experiences with all of us. Of all the random plans you've pushed me into over the years, I'm grateful for the Goa trip this year — clearly one of your better life decisions for me 😂 — that trip turned out to be quite the plot twist in my life, thanks to you. Life's definitely been more fun with you around, and I'm really grateful for our friendship.\n\nHave an amazing birthday!!!!! Love you, I hope you have a wonderful birthday and may all your dreams and aspirations come true. Great things coming your way. See you soon.",
    icon: FaCalendar,
    image: '/Message/Anirudh.jpg',
    wishImage: '/Message/Anirudh-msg.jpg',
    relatedIds: [6, 2],
    energy: 100,
  },
  {
    id: 2,
    title: 'Disha',
    date: 'Feb 2024',
    content: "Hi there Yogi Bear,\n\nHAPPY BIRTHDAY, and may you have the most fun day and year with the people you love.\n\nI still remember the first time you walked into class, and I was a bit scared of you, although I had no need to be. You turned out to be the sweetest being in this universe. You taught me to trust people again and showed me what true friendships could be like! Apart from you being all beauty and brains, you are also someone who is a great friend and someone I can always just call anytime I want. You are reliable, tough, and also soft… a great balance of many opposite things. You are a mess, but also so organised in your thoughts and as a person; it always leaves me in awe. You may not feel that at times, but you are.\n\nI can never sum you up in a paragraph, and I will never want to restrict you to one. Wishing you the best birthday ever and a happy Yuga year ahead.\n\nSLAY QUEEN!!!!!! SLAY YOUR DRAGOOOOONSSSSS 🎉🐉👑",
    icon: FaFileAlt,
    image: '/Message/Disha.jpg',
    wishImage: '/Message/Disha-msg.jpg',
    relatedIds: [1, 3],
    energy: 85,
  },
  {
    id: 3,
    title: 'Karan',
    date: 'Mar 2024',
    content: "Happy Birthday Babee!\n\nWelcome to your late 20s cuuttuuu! I love you very much. I mean I always knew I loved you before and you were the first person that I wanted to share any news be it good or bad. I always have and will love talking to you, majorly cause you always give me such juicy gossips xD. I'm really glad that we finally took the big step and started dating.\n\nAs much as I hate the long distance in LDR, I love the R even more. There is no other person that I'd rather be dating. I can't wait for us to meet soon and travel the world. Like you said, 2026 is our year, so lets make the best of it.\n\nLove,\nAunty (not Karan xD)",
    icon: FaCode,
    image: '/Message/Karan.jpg',
    wishImage: '/Message/Karan-msg.jpg',
    relatedIds: [2, 4],
    energy: 70,
  },
  {
    id: 4,
    title: 'Saumya',
    date: 'Apr 2024',
    content: "ITS MOTUS BIRTHDAY\n\nPeople say 13 is unlucky, but how could it ever be? The luckiest thing in my life was born on this day.\n\nIt honestly feels like yesterday when we first met in the JSS canteen. Since then we've somehow grown up side by side through everything — I taught you how to drive, witnessed your first fake heartbreak and your first real one, and in return you taught me a few things too… like how it's apparently possible to simply not care about things such as keeping the house clean. 😂\n\nI know I'm not the best at writing emotional messages, but I really want you to know how much I appreciate you. Thank you for always being there, through all phases of life. You've truly been my rock.\n\nHappy Birthday, Adi 👯",
    icon: FaUser,
    image: '/Message/Saumya.jpg',
    wishImage: '/Message/Saumya-msg.jpg',
    relatedIds: [3, 5],
    energy: 55,
  },
  {
    id: 5,
    title: 'Shivani',
    date: 'May 2024',
    content: "Happy birthday Yuga!!!\n\nI can't believe I met you so long ago, the year was 2009 and at Silent Shore. I remember us being so ready to jump in the pond water back then just cause it looked fun and also cause our parents were boring us.\n\nI just want to give you this message to say that you have always been an amazing person and someone that I could always trust. I always love our sleepovers or coffee dates! Whenever I hear you're going to be there, I would always jump up to hang out even if I didn't feel like it at first.\n\nYou have always been the most beautiful person inside and out. I will always love and treasure our friendship which all started because our dads decided to be friends. Whenever I think of you, I wish you always be happy and keep smiling, because you deserve the best in life. Love you 🩷",
    icon: FaClock,
    image: '/Message/Shivani-1.jpg',
    wishImage: '/Message/Shivani-1-msg.jpg',
    relatedIds: [4, 6],
    energy: 40,
  },
  {
    id: 6,
    title: 'Shivani',
    date: 'Jun 2024',
    content: "Happy Birthday Cutuuuu!!!\n\nJust thinking about you and all the fun, chaos and memories we've created together makes me smile. Our late night hangouts, random late night trips, getting ready to go out for hours just to sometimes end up staying back home eating pizza instead. The shopping trips, the sudden plans, and our Netflix nights where we stay up way too late and only go to bed when the sun is literally coming up. Those are honestly some of my favorite memories.\n\nAnd even the days where we're just sitting together barely saying anything, but somehow it still feels warm and comforting…… those moments mean just as much. I cherish you sooo much and I'm so grateful for you and all the memories we've made. I can't wait for many more trips, shopping sprees, late nights, and random adventures with you.\n\nLove you always… and I can't wait for us to be 60 and still hot together. I really hope you achieve everything you think and dream of, I'm very proud of you. I met you in times where I had completely given up on finding my girlypop. You've been there and have been such an amazing support. Through thick and thin. I will always be there too. I'm so grateful for you accepting all my shortcomings and being in my life. See you soon!!!!!!",
    icon: FaCalendar,
    image: '/Message/Shivani-2.jpg',
    wishImage: '/Message/Shivani-2-msg.jpg',
    relatedIds: [5, 1],
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
  const timelineDataRef = useRef(timelineData)
  timelineDataRef.current = timelineData

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

      timelineDataRef.current.forEach((item, index) => {
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
            timelineDataRef.current.length,
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

        {!activeItem && (
          <motion.button
            className={styles.cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenShop}
          >
            Surprise
          </motion.button>
        )}
      </div>
    </section>
  )
}
