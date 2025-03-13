"use client";
import styles from "./page.module.css";
import { LuckyWheelPage } from "@/app/pages/lucky/lucky-wheel-page";
import { LuckyGridPage } from "@/app/pages/lucky/lucky-grid-page";
import dynamic from "next/dynamic";
import { useState } from "react";
const StrategyArmoryButton = dynamic(async () => (await import("./components/StrategyArmory")).StrategyArmory);
const ActivityAccountButton = dynamic(async () => (await import("./components/ActivityAccount")).ActivityAccount);
const CalendarSignButton = dynamic(async () => (await import("./components/CalendarSign")).CalendarSign);
const StrategyRuleWeightButton = dynamic(async () => (await import("./components/StrategyRuleWeight")).StrategyRuleWeight);

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
      <div className={styles.page}>
          {/*<main className={styles.main}>*/}
          <div className={styles.ctas}>
              幸运抽奖平台
          </div>

          {/* 按钮容器 */}
          <div
              style={{
                  display: "flex", // 设置为弹性布局
                  gap: "1rem", // 按钮之间的间距
                  alignItems: "center", // 垂直居中对齐
                  marginBottom: "1rem", // 底部间距
              }}
          >
              {/* 装配抽奖 */}
              <StrategyArmoryButton/>
              {/* 账户额度 */}
              <ActivityAccountButton refresh={refresh}/>
              {/* 日历签到 */}
              <CalendarSignButton handleRefresh={handleRefresh}/>
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>

              {/* 添加抽奖转盘 */}
              <div className={styles.flexContainer}>
                  <div className={styles.card}>
                      <LuckyWheelPage handleRefresh={handleRefresh}/>
                  </div>
                  <div className={styles.card}>
                      <LuckyGridPage handleRefresh={handleRefresh}/>
                  </div>
              </div>

              {/* 策略规则权重 */}
              <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                  <StrategyRuleWeightButton refresh={refresh}/>
              </div>

          </div>

          {/*</main>*/}
      </div>
  );
}