import { queryRaffleStrategyRuleWeight } from "@/apis";
import { useEffect, useState } from "react";
import { StrategyRuleWeightVO } from "@/types/StrategyRuleWeightVO";

// @ts-ignore
export function StrategyRuleWeight({ refresh }) {
    const [strategyRuleWeightVOList, setStrategyRuleWeightVOList] = useState<StrategyRuleWeightVO[]>([]);

    const queryRaffleStrategyRuleWeightHandle = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const result = await queryRaffleStrategyRuleWeight(String(queryParams.get('userId')), Number(queryParams.get('activityId')));
        const { code, info, data }: { code: string; info: string; data: StrategyRuleWeightVO[] } = await result.json();

        if (code != "0000") {
            window.alert("查询活动账户额度，接口调用失败 code:" + code + " info:" + info);
            return;
        }

        setStrategyRuleWeightVOList(data);
    };

    // 这是你的进度条组件
    // @ts-ignore
    const ProgressBar = ({ index, total, completed, awards }) => {
        // 计算完成的百分比
        const percentage = (completed / total) * 100;

        return (
            <div style={{ width: "100%", padding: "1rem", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                {/* 进度条容器 */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    {/* 文本 */}
                    <div style={{ marginRight: "0.5rem", minWidth: "80px" }}>
                        <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#4b5563" }}>抽奖阶梯{index + 1}</span>
                    </div>
                    {/* 进度条 */}
                    <div
                        style={{
                            backgroundColor: "#e5e7eb", // 对应 bg-gray-200
                            borderRadius: "9999px", // 对应 rounded-full
                            height: "1rem", // 对应 h-4
                            position: "relative", // 对应 relative
                            overflow: "hidden", // 对应 overflow-hidden
                            flexGrow: 1, // 对应 flex-grow
                            minWidth: "150px", // 增加最小宽度
                        }}
                    >
                        {/* 进度条填充部分 */}
                        <div
                            style={{
                                background: "linear-gradient(to right, #3b82f6, #60a5fa)", // 对应 bg-gradient-to-r from-blue-500 to-blue-400
                                height: "1rem", // 对应 h-4
                                borderRadius: "9999px", // 对应 rounded-full
                                width: `${percentage}%`, // 动态宽度
                                transition: "width 0.5s ease-in-out", // 添加过渡效果
                            }}
                        ></div>
                        {/* 进度条文本 */}
                        <div
                            style={{
                                position: "absolute", // 对应 absolute
                                right: 0, // 对应 right-0
                                top: 0, // 对应 top-0
                                height: "1rem", // 对应 h-4
                                display: "flex", // 对应 flex
                                alignItems: "center", // 对应 items-center
                                justifyContent: "flex-end", // 对应 justify-end
                                paddingRight: "0.25rem", // 对应 pr-1
                                width: "100%", // 确保文本容器覆盖整个进度条宽度
                            }}
                        >
                            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#1e293b" }}>
                                {completed > total ? total : completed}/{total}
                            </span>
                        </div>
                    </div>
                </div>
                {/* 奖品范围 */}
                {awards && (
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ fontSize: "0.875rem", color: "#4b5563", fontWeight: "600" }}>必中奖品范围</div>
                        {awards.map((award, idx) => (
                            <div key={award.awardId} style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                {idx + 1}. {award.awardTitle}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        queryRaffleStrategyRuleWeightHandle().then(r => {
        });
    }, [refresh]);

    return (
        <div
            style={{
                display: "flex", // 使用 Flex 布局
                gap: "2rem", // 增加间距
                padding: "1rem", // 增加内边距
                justifyContent: "space-between", // 让内容均匀分布
                backgroundColor: "#f9fafb", // 背景颜色
                borderRadius: "12px", // 圆角
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 阴影
            }}
        >
            {strategyRuleWeightVOList.map((ruleWeight, index) => (
                <div
                    key={index}
                    style={{
                        flex: 1, // 每个抽奖阶梯平分宽度
                        maxWidth: "30%", // 限制最大宽度为 30%
                    }}
                >
                    <ProgressBar
                        index={index}
                        total={ruleWeight.ruleWeightCount}
                        completed={ruleWeight.userActivityAccountTotalUseCount}
                        awards={ruleWeight.strategyAwards}
                    />
                </div>
            ))}
        </div>
    );
}