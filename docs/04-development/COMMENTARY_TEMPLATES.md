/**
 * 주석 템플릿 모음
 * 함께봄 프로젝트에서 사용하는 표준화된 주석 템플릿입니다.
 */

/**
 * React 함수 컴포넌트 주석 템플릿
 */
export const FUNCTION_COMPONENT_TEMPLATE = `/**
 * [컴포넌트 이름] 컴포넌트
 * 
 * @description 
 * [컴포넌트의 목적과 주요 기능을 상세하게 설명합니다.
 * 
 * 주요 기능:
 * - [기능 1]: 설명
 * - [기능 2]: 설명  
 * - [기능 3]: 설명
 * 
 * @performance
 * - [성능 최적화 사항 1]
 * - [성능 최적화 사항 2]
 * - [성능 최적화 사항 3]
 * 
 * @since [생성일자]
 * @author [작성자/팀]
 * 
 * @example
 * \`\`typescript
 * <[ComponentName] [속성들] />
 * \`\`
 * 
 * @param {[타입]} [파라미터명] - [파라미터 설명]
 * @returns {[타입]} [반환값 설명]
 * @throws {[에러타입]} [발생 조건 설명]
 * @see {@link [관련 문서 URL]}
 */
export default function [ComponentName]({ [props] }: [PropsType]) {
  // [주요 로직 설명]
  
  return (
    <div>
      {/* JSX 구조에 대한 주석 */}
    </div>
  );
}`;

/**
 * API 함수 주석 템플릿
 */
export const API_FUNCTION_TEMPLATE = `/**
 * [API 함수 이름]
 * 
 * @description 
 * [API 기능에 대한 상세 설명]
 * 
 * @endpoint [HTTP 메서드] [API 경로]
 * @auth required|optional
 * @rateLimit [요청 제한]
 * 
 * @example
 * \`\`typescript
 * const result = await [functionName]({
 *   [파라미터]: [값]
 * });
 * \`\`
 * 
 * @param {[타입]} [파라미터명] - [파라미터 설명]
 * @returns {[타입]} [반환값 설명]
 * @throws {[에러타입]} [발생 조건 설명]
 * @see {@link [관련 문서 URL]}
 */
export const [functionName] = async ([params]) => {
  // [구현 로직 설명]
  
  return [result];
};`;

/**
 * Custom Hook 주석 템플릿
 */
export const CUSTOM_HOOK_TEMPLATE = `/**
 * [Hook 이름] 커스텀 훅
 * 
 * @description 
 * [Hook의 목적과 사용법을 상세하게 설명합니다]
 * 
 * 주요 기능:
 * - [기능 1]: 설명
 * - [기능 2]: 설명
 * 
 * @performance
 * - [성능 최적화 사항 1]
 * - [성능 최적화 사항 2]
 * 
 * @since [생성일자]
 * @author [작성자/팀]
 * 
 * @example
 * \`\`typescript
 * const [result] = [hookName]({
 *   [파라미터]: [값]
 * });
 * \`\`
 * 
 * @param {[타입]} [파라미터명] - [파라미터 설명]
 * @returns {[반환타입]} [반환값 설명]
 * 
 * @see {@link [관련 문서]}
 */
export const [hookName] = <[GenericTypes]>({
  // [Hook 구현 로직]
  
  return [returnValue];
};`;

/**
 * 타입 정의 주석 템플릿
 */
export const TYPE_DEFINITION_TEMPLATE = `/**
 * [타입/인터페이스 이름]
 * 
 * @description 
 * [타입의 목적과 사용처를 설명합니다]
 * 
 * @since [생성일자]
 * @author [작성자/팀]
 * 
 * @example
 * \`\`typescript
 * const [변수명]: [TypeName] = {
 *   [속성]: [값]
 * };
 * \`\`
 */
export interface [TypeName] {
  /** [속성 설명] */
  [propertyName]: [propertyType];
  
  /** [속성 설명] */
  [propertyName]: [propertyType];
}`;

/**
 * 복잡한 로직 주석 템플릿
 */
export const COMPLEX_LOGIC_TEMPLATE = `/**
 * [로직 이름] 처리 로직
 * 
 * @description 
 * [복잡한 로직에 대한 단계별 설명]
 * 
 * 처리 단계:
 * 1. [단계 1 설명]
 * 2. [단계 2 설명]
 * 3. [단계 3 설명]
 * 
 * @performance 
 * - [성능 최적화 기법 1]: 설명과 효과
 * - [성능 최적화 기법 2]: 설명과 효과
 * - [성능 최적화 기법 3]: 설명과 효과
 * 
 * @param {[타입]} [파라미터명] - [파라미터 설명]
 * @returns {[타입]} [처리 결과 설명]
 * @throws {[에러타입]} [에러 발생 조건]
 */
const [functionName] = ([params]) => {
  // [1단계 로직 구현]
  
  // [2단계 로직 구현]
  
  // [3단계 로직 구현]
  
  return [result];
};`;