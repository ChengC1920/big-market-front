import { queryRaffleStrategyRuleWeight } from "@/apis";
import { useEffect, useState } from "react";
import { StrategyRuleWeightVO } from "@/types/StrategyRuleWeightVO";
import { RaffleAwardVO } from "@/types/RaffleAwardVO"; // 假设 RaffleAwardVO 定义在这个文件中

//@ts-ignore
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

    // 进度条组件
    //@ts-ignore
    const ProgressBar = ({ index, total, completed, awards }) => {
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
                            backgroundColor: "#e5e7eb",
                            borderRadius: "9999px",
                            height: "1rem",
                            position: "relative",
                            overflow: "hidden",
                            flexGrow: 1,
                            minWidth: "150px",
                        }}
                    >
                        {/* 进度条填充部分 */}
                        <div
                            style={{
                                background: "linear-gradient(to right, #3b82f6, #60a5fa)",
                                height: "1rem",
                                borderRadius: "9999px",
                                width: `${percentage}%`,
                                transition: "width 0.5s ease-in-out",
                            }}
                        ></div>
                        {/* 进度条文本 */}
                        <div
                            style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                height: "1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: "0.25rem",
                                width: "100%",
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
                        {awards.map((award: RaffleAwardVO, idx: number) => {
                            // 替换 award 对象
                            const replacedAward: RaffleAwardVO = {
                                awardId: award.awardId,
                                awardTitle: award.awardTitle,
                                awardSubtitle: award.awardSubtitle,
                            };

                            return (
                                <div key={replacedAward.awardId} style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                    {idx + 1}. {replacedAward.awardTitle}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        queryRaffleStrategyRuleWeightHandle().then(r => {});
    }, [refresh]);

    return (
        <div
            style={{
                display: "flex",
                gap: "2rem",
                padding: "1rem",
                justifyContent: "space-between",
                backgroundColor: "#f9fafb",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            {strategyRuleWeightVOList.map((ruleWeight, index) => (
                <div
                    key={index}
                    style={{
                        flex: 1,
                        maxWidth: "30%",
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