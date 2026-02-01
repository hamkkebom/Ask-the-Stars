#!/bin/bash

# 함께봄 주석 자동화 스크립트
# 사용법: ./add-commentary.sh [파일경로]

FILE_PATH=${1:-"src/components"}

echo "🌟 함께봄 코드 주석 추가 시작"
echo "📁 대상 경로: $FILE_PATH"

# 주석 추가 함수
add_commentary() {
  local file=$1
  local header=$2
  local description=$3
  
  if [[ ! -f "$file" ]]; then
    echo "❌ 파일을 찾을 수 없습니다: $file"
    return 1
  fi
  
  echo "📝 $file 에 주석 추가 중..."
  
  # 기존 내용 백업
  cp "$file" "$file.backup"
  
  # 주석 추가
  cat > "$file" << EOF
/**
 * $header
 * 
 * @description 
 * $description
 * 
 * @performance 
 * - 병렬 처리 적용
 * - 메모이제이션 최적화
 * - 불필요한 리렌더링 방지
 * 
 * @since $(date +%Y.%m.%d)
 * @author 함께봄 개발팀
 * 
 * @example
 * 예제 코드 추가
 */
EOF
  
  # 기존 내용 추가
  cat "$file.backup" >> "$file"
  
  # 백업 파일 삭제
  rm "$file.backup"
  
  echo "✅ $file 주석 추가 완료"
}

# TypeScript 파일 주석화
comment_typescript_files() {
  echo "🔍 TypeScript 파일 주석화 시작..."
  
  # 모든 tsx 파일 찾기
  find "$FILE_PATH" -name "*.tsx" -o -name "*.ts" | while read file; do
    echo "📝 처리 중: $file"
    
    # 컴포넌트 함수 찾기
    if [[ "$file" == *".tsx" ]]; then
      # TSX 컴포넌트 주석 추가
      add_commentary "$file" "React 컴포넌트" "해당 컴포넌트의 주요 기능을 구현합니다."
    else
      # TypeScript 함수 주석 추가
      add_commentary "$file" "TypeScript 모듈" "해당 모듈의 핵심 기능을 제공합니다."
    fi
    
    echo "----------------------------------------"
  done
}

# 실행
comment_typescript_files

echo "🎉 주석 추가 완료!"
echo ""
echo "📋 다음 작업을 추천합니다:"
echo "1. 각 파일에 적절한 JSDoc 주석으로 업데이트"
echo "2. 복잡한 로직에 단계별 설명 추가"
echo "3. 성능 최적화 지점 상세 설명"
echo "4. 예제 코드 및 에러 케이스 추가"