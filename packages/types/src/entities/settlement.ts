export interface Settlement {
  id: string;
  project_id: string;
  freelancer_id: string;

  // 금액
  amount: number;
  platform_fee: number; // 플랫폼 수수료
  net_amount: number; // 실수령액

  // 정산 유형
  type: SettlementType;

  // 상태
  status: SettlementStatus;

  // 결제 정보
  payment_method?: string;
  bank_name?: string;
  account_number?: string;
  account_holder?: string;

  // 타임스탬프
  created_at: Date;
  processed_at?: Date;
  paid_at?: Date;

  // 메모
  notes?: string;
}

export type SettlementType = 'first' | 'second' | 'bonus';

export type SettlementStatus =
  | 'pending'      // 정산 대기
  | 'processing'   // 처리 중
  | 'completed'    // 완료
  | 'failed'       // 실패
  | 'cancelled';   // 취소

export interface SettlementSummary {
  total_amount: number;
  total_platform_fee: number;
  total_net_amount: number;
  pending_count: number;
  completed_count: number;
  period_start: Date;
  period_end: Date;
}
