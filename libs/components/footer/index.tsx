import React from 'react'
import styles from '../../../styles/Home.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            >
                <div className="">
                    <div className="font-bold">Han MingYun</div>
                    <div className="mt-2 text-gray-500">A few words about how you found Coinable how did you feel about this task!</div>
                </div>
            </a>
        </footer>
    )
}