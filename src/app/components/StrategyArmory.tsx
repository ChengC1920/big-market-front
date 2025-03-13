import React from "react";
import { activityStrategyArmory } from "@/apis";

export function StrategyArmory() {
    const strategyArmoryHandle = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const activityId = Number(queryParams.get("activityId"));
        if (!activityId) {
            window.alert(
                "请在请求地址中，配置 activityId 值，如：http://localhost:3000/?activityId=100301"
            );
            return;
        }
        const res = await activityStrategyArmory(activityId);
        const { code, info } = await res.json();
        if (code != "0000") {
            window.alert("抽奖活动策略装配失败 code:" + code + " info:" + info);
            return;
        }

        window.alert("装配完成，开始体验吧!")
    };

    return (
        <div
            style={{
                padding: "0.5rem 1.5rem", // px-6 py-2
                marginBottom: "2rem", // mb-8
                color: "white", // text-white
                backgroundColor: "#3b82f6", // bg-blue-500
                borderRadius: "9999px", // rounded-full
                boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // shadow-lg
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2563eb"; // hover:bg-blue-600
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#3b82f6"; // bg-blue-500
            }}
            onFocus={(e) => {
                e.target.style.outline = "none"; // focus:outline-none
                e.target.style.boxShadow = "0 0 0 2px #93c5fd"; // focus:ring-2 focus:ring-blue-300
            }}
            onBlur={(e) => {
                e.target.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"; // shadow-lg
            }}
            onClick={strategyArmoryHandle}
        >
            装配抽奖
        </div>
    );
}