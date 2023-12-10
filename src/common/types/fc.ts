import type Connector from "../instances/Connector";
import type { FC } from "react";

interface PageDefaultProp {
	connector: {
		current: Connector | null;
	}
}

type GFC = FC<PageDefaultProp>;
type GFCWithProp<T> = FC<PageDefaultProp & T>;

export type { GFC, GFCWithProp };
