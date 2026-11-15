/** Component 묶음 하나. 이름은 @tide-design/components 타입 선언(dist/index.d.ts)에 있는 것만 쓴다. */
export interface ComponentGroup {
  id: string;
  title: string;
  /** 두 줄 설명. 사실은 tide README와 tide-web을 만들며 확인한 것만 */
  body: string;
  components: string[];
}

/** `getComponentGroups` 응답 */
export interface GetComponentGroupsResponse {
  groups: ComponentGroup[];
}
