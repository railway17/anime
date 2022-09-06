import React from 'react'
import styles from '../../../styles/Home.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="text-left w-full">
                <div className="font-bold">Han MingYun</div>
                <div className="mt-2 text-gray-500">A few words about how you found Coinable how did you feel about this task!</div>
            </div>        
        </footer>
    )
}