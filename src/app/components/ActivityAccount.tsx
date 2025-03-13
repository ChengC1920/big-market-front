import { queryUserActivityAccount } from "@/apis";
import React, { useEffect, useState } from "react";
import { UserActivityAccountVO } from "@/types/UserActivityAccountVO";

// @ts-ignore
export function ActivityAccount({ refresh }) {
    const [dayCount, setDayCount] = useState(0);

    const queryUserActivityAccountHandle = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        // 查询账户数据
        const result = await queryUserActivityAccount(String(queryParams.get('userId')), Number(queryParams.get('activityId')));
        const { code, info, data }: { code: string; info: string; data: UserActivityAccountVO } = await result.json();

        if (code != "0000") {
            window.alert("查询活动账户额度，接口调用失败 code:" + code + " info:" + info);
            return;
        }

        // 日可抽奖额度
        setDayCount(data.dayCountSurplus);
    };

    useEffect(() => {
        queryUserActivityAccountHandle().then(r => {
        });
    }, [refresh]);

    return (
        <>
            <div
                style={{
                    padding: "0.5rem 1.5rem", // 对应 px-6 py-2
                    marginBottom: "2rem", // 对应 mb-8
                    color: "white", // 对应 text-white
                    backgroundColor: "#f59e0b", // 对应 bg-yellow-500
                    borderRadius: "9999px", // 对应 rounded-full
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // 对应 shadow-lg
                    transition: "background-color 0.2s", // 对应 hover:bg-yellow-600
                    cursor: "pointer", // 对应 cursor-pointer
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d97706"; // 对应 hover:bg-yellow-600
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f59e0b"; // 恢复默认背景色
                }}
                onFocus={(e) => {
                    e.currentTarget.style.outline = "none"; // 对应 focus:outline-none
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.5)"; // 对应 focus:ring-2 focus:ring-blue-300
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; // 恢复默认阴影
                }}
            >
                今日可抽奖{dayCount}次
            </div>
        </>
    );
}