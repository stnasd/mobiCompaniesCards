export type IRepoEntry = {
  companies: Array<IItemid>;
};
export type IItemid = {
  company: { companyId: string };
  customerMarkParameters: {
    mark: string;
    loyaltyLevel: {
      cashToMark: number;
      name: string;
    };
  };
  mobileAppDashboard: {
    accentColor: string;
    backgroundColor: string;
    cardBackgroundColor: string;
    companyName: string;
    highlightTextColor: string;
    logo: string;
    mainColor: string;
    textColor: string;
  };
};
export type PropsQuery = {
  offset: number;
  limit: number;
};
export interface ICardProps {
  cards: IItemid;
}
