// جهت کتابخانه ی AOS
import { useEffect, useRef, useState } from "react";
import Aos from "aos";
// جهت کتابخانه ی AOS

import { useLoaderData } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import SellerProfile from "./SellerProfile";

interface Seller {
    storeId: string
    storeName: string
    sellerID: string
    storeCreatedAt: string
    userId: string
    username: string
    userProfileImage?: string
}

interface AllProducts {
    createdAt : string , 
    description? : string , 
    imageUrl : string  ,
    name : string  ,
    price : number ,
    sellerId : string  ,
    tag : string ,
    updatedAt : string  ,
}

interface SellersAndAllProducts {
    usersWithStore: Seller[];
    allProducts: AllProducts[];
}

function TopSellersSlider() {

    // جهت کتابخانه ی AOS
    useEffect(() => {
        Aos.init({ duration: 1000, once: false });
    }, []);
    // جهت کتابخانه ی AOS

    // دیتای فروشنده‌ها، از لودر مسیر market (به ترتیب زمان ساخته شدن فروشگاه)
    const { usersWithStore } = useLoaderData() as SellersAndAllProducts



    const sellers = usersWithStore




    const trackRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // هنگام اسکرول دستی (لمسی)، بعد از توقف اسکرول، نزدیک‌ترین کارت به مرکز پیدا و ثبت می‌شود
    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const handleScroll = () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

            scrollTimeoutRef.current = setTimeout(() => {
                const trackRect = track.getBoundingClientRect()
                const trackCenter = trackRect.left + trackRect.width / 2

                let closestIndex = 0 
                let closestDistance = Infinity

                cardRefs.current.forEach((el, index) => {
                    if (!el) return
                    const rect = el.getBoundingClientRect()
                    const cardCenter = rect.left + rect.width / 2
                    const distance = Math.abs(cardCenter - trackCenter)
                    if (distance < closestDistance) {
                        closestDistance = distance
                        closestIndex = index
                    }
                })

                setActiveIndex(closestIndex)
            }, 120)
        }

        track.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            track.removeEventListener('scroll', handleScroll)
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        }
    }, [sellers.length])

    // با کلیک دکمه، activeIndex بلافاصله و مستقیم آپدیت می‌شود
    // (منتظر تشخیص اسکرول نمی‌مانیم، تا کلیک‌های پشت‌سرهم همیشه درست کار کنند)
    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(sellers.length - 1, index))
        setActiveIndex(clamped)

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        cardRefs.current[clamped]?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }

    const canGoPrev = activeIndex > 0
    const canGoNext = activeIndex < sellers.length - 1

    return (
        <>
            <style>
                {`
                    .seller-market {
                        --sm-bg: #FBFAF6;
                        --sm-surface: #FFFFFF;
                        --sm-ink: #23291F;
                        --sm-muted: #6B7566;
                        --sm-moss: #5B7553;
                        --sm-moss-soft: #E7ECE3;
                        --sm-saffron: #C98A3C;
                        --sm-line: rgba(35, 41, 31, 0.12);
                    }

                    .dark .seller-market {
                        --sm-bg: #0F1712;
                        --sm-surface: #182219;
                        --sm-ink: #ECE7DA;
                        --sm-muted: #9AA592;
                        --sm-moss: #8CAE7E;
                        --sm-moss-soft: #223026;
                        --sm-saffron: #E0A85C;
                        --sm-line: rgba(236, 231, 218, 0.14);
                    }

                    .seller-market {
                        position: relative;
                        width: 100%;
                    }

                    .seller-nav-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                        padding: 0 4px 10px;
                    }

                    .seller-counter {
                        font-size: 0.75rem;
                        color: var(--sm-muted);
                        direction: ltr;
                        font-variant-numeric: tabular-nums;
                    }

                    .seller-nav-btns {
                        display: flex;
                        gap: 8px;
                    }

                    .seller-nav-btn {
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 9999px;
                        border: 1px solid var(--sm-line);
                        background: var(--sm-surface);
                        color: var(--sm-moss);
                        cursor: pointer;
                        transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, opacity 160ms ease;
                    }

                    .seller-nav-btn:hover:not(:disabled) {
                        background: var(--sm-moss);
                        color: white;
                        border-color: var(--sm-moss);
                    }

                    .seller-nav-btn:disabled {
                        opacity: 0.35;
                        cursor: default;
                    }

                    .seller-nav-btn:focus-visible {
                        outline: 2px solid var(--sm-saffron);
                        outline-offset: 2px;
                    }

                    .seller-track {
                        display: flex;
                        gap: 16px;
                        overflow-x: auto;
                        scroll-snap-type: x mandatory;
                        scroll-padding-inline: 4px;
                        padding: 6px 4px 14px;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        mask-image: linear-gradient(to right, transparent 0, black 28px, black calc(100% - 28px), transparent 100%);
                        -webkit-mask-image: linear-gradient(to right, transparent 0, black 28px, black calc(100% - 28px), transparent 100%);
                    }

                    .seller-track::-webkit-scrollbar {
                        display: none;
                    }

.stall-card {
    flex: 0 0 auto;
    width: 156px;
    scroll-snap-align: center;
    background: var(--sm-surface);
    border: 1px solid var(--sm-line);
    border-radius: 18px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 16px;
    transition: transform 200ms ease, box-shadow 200ms ease;
}

                    .stall-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 22px rgba(35, 41, 31, 0.10);
                    }

.stall-card-awning {
    width: 100%;
    height: 15px;
    border-radius: 18px 18px 0 0;   
    background: repeating-linear-gradient(
        45deg,
        var(--sm-moss) 0px,
        var(--sm-moss) 10px,
        var(--sm-saffron) 10px,
        var(--sm-saffron) 20px
    );
}

                    .stall-card-photo-ring {
                        width: 68px;
                        height: 68px;
                        border-radius: 9999px;
                        background: var(--sm-surface);
                        border: 3px solid var(--sm-surface);
                        box-shadow: 0 0 0 2px var(--sm-moss-soft);
                        margin-top: 6px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .stall-card-photo {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .stall-card-name {
                        margin-top: 10px;
                        font-weight: 700;
                        font-size: 0.875rem;
                        color: var(--sm-ink);
                        text-align: center;
                        padding: 0 10px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 100%;
                    }

                    .stall-card-handle {
                        margin-top: 2px;
                        font-size: 0.75rem;
                        color: var(--sm-muted);
                        direction: ltr;
                    }

                    @media (min-width: 640px) {
                        .stall-card {
                            width: 176px;
                        }
                    }

                    @media (min-width: 768px) {
                        .stall-card {
                            width: 196px;
                        }
                        .stall-card-photo-ring {
                            width: 76px;
                            height: 76px;
                            margin-top: 6px;
                        }
                    }
                `}
            </style>

            <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                className="seller-market"
            >
                {sellers.length > 0 ? (
                    <>
                        {sellers.length > 1 && (
                            <div className="seller-nav-row">
                                <span className="seller-counter ">{activeIndex + 1} / {sellers.length}</span>
                                <div className="seller-nav-btns">
                                    <button
                                        type="button"
                                        aria-label="فروشنده قبلی"
                                        className="seller-nav-btn"
                                        onClick={() => goTo(activeIndex - 2)}
                                        disabled={!canGoPrev}
                                    >
                                        <MdArrowForwardIos className="text-[16px]" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="فروشنده بعدی"
                                        className="seller-nav-btn"
                                        onClick={() => goTo(activeIndex + 2)}
                                        disabled={!canGoNext}
                                    >
                                        <MdArrowBackIosNew className="text-[16px]" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="seller-track" dir="rtl" ref={trackRef}>
                            {sellers.map((seller, index) => (
                                <div
                                    key={seller.storeId}
                                    data-index={index}
                                    ref={(el) => { cardRefs.current[index] = el }}
                                >
                                    <SellerProfile seller={seller} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center py-10">
                        <p
                            dir="rtl"
                            className="text-center text-sm font-medium text-slate-400 dark:text-slate-500"
                            style={{ fontFamily: 'VAZIR' }}
                        >
                            هنوز فروشنده‌ای ثبت نشده است
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default TopSellersSlider;