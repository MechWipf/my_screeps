import { BaseNode } from './BaseNode'
import { CATEGORY } from '../helper'

export class Decorator extends BaseNode {
  category: CATEGORY = CATEGORY.DECORATOR
  child: string = ''
}

export class Condition extends BaseNode {
  category: CATEGORY = CATEGORY.CONDITION
  child: string = ''
}

export class Composite extends BaseNode {
  category: CATEGORY = CATEGORY.COMPOSITE
  children: string[] = []
}

export class Action extends BaseNode {
  category: CATEGORY = CATEGORY.ACTION
}