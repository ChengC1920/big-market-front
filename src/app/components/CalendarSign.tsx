import { calendarSignRebate, isCalendarSignRebate } from "@/apis";
import React, { useEffect, useState } from "react";

// @ts-ignore
export function CalendarSign({ handleRefresh }) {
    const [sign, setSign] = useState(false);

    const calendarSignRebateHandle = async () => {
        if (sign) {
            window.alert("今日已签到！");
            return;
        }
        const queryParams = new URLSearchParams(window.location.search);
        const result = await calendarSignRebate(String(queryParams.get('userId')));
        const { code, info }: { code: string; info: string } = await result.json();

        if (code != "0000" && code != "0003") {
            window.alert("日历签到返利接口，接口调用失败 code:" + code + " info:" + info);
            return;
        }

        setSign(true);

        // 设置一个3秒后执行的定时器
        const timer = setTimeout(() => {
            handleRefresh();
        }, 150);

        // 清除定时器，以防组件在执行前被卸载
        return () => clearTimeout(timer);
    };

    const isCalendarSignRebateHandle = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const result = await isCalendarSignRebate(String(queryParams.get('userId')));
        const { code, info, data }: { code: string; info: string; data: boolean } = await result.json();

        if (code != "0000") {
            window.alert("判断是否签到接口，接口调用失败 code:" + code + " info:" + info);
            return;
        }

        setSign(data);
    };

    useEffect(() => {
        isCalendarSignRebateHandle().then(r => {
        });
    }, []);

    return (
        <>
            <div
                style={{
                    padding: "0.5rem 1.5rem", // 对应 px-6 py-2
                    marginBottom: "2rem", // 对应 mb-8
                    color: "white", // 对应 text-white
                    backgroundColor: sign ? "#166534" : "#16a34a", // 对应 bg-green-600 和 hover:bg-green-800
                    borderRadius: "9999px", // 对应 rounded-full
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // 对应 shadow-lg
                    transition: "background-color 0.2s", // 对应 hover 效果
                    cursor: "pointer", // 对应 cursor-pointer
                    outline: "none", // 对应 focus:outline-none
                }}
                onClick={calendarSignRebateHandle}
                onMouseEnter={(e) => {
                    if (!sign) {
                        e.currentTarget.style.backgroundColor = "#166534"; // 对应 hover:bg-green-800
                    }
                }}
                onMouseLeave={(e) => {
                    if (!sign) {
                        e.currentTarget.style.backgroundColor = "#16a34a"; // 恢复默认背景色
                    }
                }}
                onFocus={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.5)"; // 对应 focus:ring-2 focus:ring-blue-300
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; // 恢复默认阴影
                }}
            >
                {sign ? "今日已签到" : "点击签到「获得抽奖次数」"}
            </div>
        </>
    );
}