declare module "@hyperapp/html" {
    import {
        VirtualElementProps,
        VirtualContent,
        VirtualElement,
        VirtualText,
        ValidateCustomPayloads,
    } from "hyperapp"

    export function text(t: string): VirtualText

    export function a(): VirtualElement
    export function a<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function a(first: VirtualContent): VirtualElement
    export function a<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement

    export function b(): VirtualElement
    export function b<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function b(first: VirtualContent): VirtualElement
    export function b<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function i(): VirtualElement
    export function i<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function i(first: VirtualContent): VirtualElement
    export function i<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function p(): VirtualElement
    export function p<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function p(first: VirtualContent): VirtualElement
    export function p<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function q(): VirtualElement
    export function q<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function q(first: VirtualContent): VirtualElement
    export function q<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function s(): VirtualElement
    export function s<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function s(first: VirtualContent): VirtualElement
    export function s<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function br(): VirtualElement
    export function br<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function br(first: VirtualContent): VirtualElement
    export function br<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function dd(): VirtualElement
    export function dd<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function dd(first: VirtualContent): VirtualElement
    export function dd<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function dl(): VirtualElement
    export function dl<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function dl(first: VirtualContent): VirtualElement
    export function dl<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function dt(): VirtualElement
    export function dt<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function dt(first: VirtualContent): VirtualElement
    export function dt<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function em(): VirtualElement
    export function em<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function em(first: VirtualContent): VirtualElement
    export function em<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h1(): VirtualElement
    export function h1<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h1(first: VirtualContent): VirtualElement
    export function h1<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h2(): VirtualElement
    export function h2<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h2(first: VirtualContent): VirtualElement
    export function h2<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h3(): VirtualElement
    export function h3<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h3(first: VirtualContent): VirtualElement
    export function h3<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h4(): VirtualElement
    export function h4<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h4(first: VirtualContent): VirtualElement
    export function h4<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h5(): VirtualElement
    export function h5<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h5(first: VirtualContent): VirtualElement
    export function h5<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function h6(): VirtualElement
    export function h6<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function h6(first: VirtualContent): VirtualElement
    export function h6<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function hr(): VirtualElement
    export function hr<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function hr(first: VirtualContent): VirtualElement
    export function hr<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function li(): VirtualElement
    export function li<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function li(first: VirtualContent): VirtualElement
    export function li<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function ol(): VirtualElement
    export function ol<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function ol(first: VirtualContent): VirtualElement
    export function ol<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function rp(): VirtualElement
    export function rp<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function rp(first: VirtualContent): VirtualElement
    export function rp<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function rt(): VirtualElement
    export function rt<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function rt(first: VirtualContent): VirtualElement
    export function rt<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function td(): VirtualElement
    export function td<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function td(first: VirtualContent): VirtualElement
    export function td<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function th(): VirtualElement
    export function th<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function th(first: VirtualContent): VirtualElement
    export function th<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function tr(): VirtualElement
    export function tr<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function tr(first: VirtualContent): VirtualElement
    export function tr<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function ul(): VirtualElement
    export function ul<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function ul(first: VirtualContent): VirtualElement
    export function ul<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function bdi(): VirtualElement
    export function bdi<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function bdi(first: VirtualContent): VirtualElement
    export function bdi<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function bdo(): VirtualElement
    export function bdo<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function bdo(first: VirtualContent): VirtualElement
    export function bdo<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function col(): VirtualElement
    export function col<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function col(first: VirtualContent): VirtualElement
    export function col<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function del(): VirtualElement
    export function del<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function del(first: VirtualContent): VirtualElement
    export function del<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function dfn(): VirtualElement
    export function dfn<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function dfn(first: VirtualContent): VirtualElement
    export function dfn<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function div(): VirtualElement
    export function div<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function div(first: VirtualContent): VirtualElement
    export function div<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function img(): VirtualElement
    export function img<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function img(first: VirtualContent): VirtualElement
    export function img<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function ins(): VirtualElement
    export function ins<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function ins(first: VirtualContent): VirtualElement
    export function ins<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function kbd(): VirtualElement
    export function kbd<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function kbd(first: VirtualContent): VirtualElement
    export function kbd<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function map(): VirtualElement
    export function map<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function map(first: VirtualContent): VirtualElement
    export function map<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function nav(): VirtualElement
    export function nav<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function nav(first: VirtualContent): VirtualElement
    export function nav<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function pre(): VirtualElement
    export function pre<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function pre(first: VirtualContent): VirtualElement
    export function pre<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function rtc(): VirtualElement
    export function rtc<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function rtc(first: VirtualContent): VirtualElement
    export function rtc<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function sub(): VirtualElement
    export function sub<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function sub(first: VirtualContent): VirtualElement
    export function sub<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function sup(): VirtualElement
    export function sup<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function sup(first: VirtualContent): VirtualElement
    export function sup<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function wbr(): VirtualElement
    export function wbr<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function wbr(first: VirtualContent): VirtualElement
    export function wbr<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function abbr(): VirtualElement
    export function abbr<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function abbr(first: VirtualContent): VirtualElement
    export function abbr<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function area(): VirtualElement
    export function area<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function area(first: VirtualContent): VirtualElement
    export function area<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function cite(): VirtualElement
    export function cite<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function cite(first: VirtualContent): VirtualElement
    export function cite<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function code(): VirtualElement
    export function code<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function code(first: VirtualContent): VirtualElement
    export function code<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function data(): VirtualElement
    export function data<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function data(first: VirtualContent): VirtualElement
    export function data<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function form(): VirtualElement
    export function form<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function form(first: VirtualContent): VirtualElement
    export function form<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function main(): VirtualElement
    export function main<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function main(first: VirtualContent): VirtualElement
    export function main<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function mark(): VirtualElement
    export function mark<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function mark(first: VirtualContent): VirtualElement
    export function mark<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function ruby(): VirtualElement
    export function ruby<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function ruby(first: VirtualContent): VirtualElement
    export function ruby<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function samp(): VirtualElement
    export function samp<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function samp(first: VirtualContent): VirtualElement
    export function samp<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function span(): VirtualElement
    export function span<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function span(first: VirtualContent): VirtualElement
    export function span<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function time(): VirtualElement
    export function time<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function time(first: VirtualContent): VirtualElement
    export function time<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function aside(): VirtualElement
    export function aside<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function aside(first: VirtualContent): VirtualElement
    export function aside<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function audio(): VirtualElement
    export function audio<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function audio(first: VirtualContent): VirtualElement
    export function audio<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function input(): VirtualElement
    export function input<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function input(first: VirtualContent): VirtualElement
    export function input<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function label(): VirtualElement
    export function label<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function label(first: VirtualContent): VirtualElement
    export function label<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function meter(): VirtualElement
    export function meter<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function meter(first: VirtualContent): VirtualElement
    export function meter<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function param(): VirtualElement
    export function param<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function param(first: VirtualContent): VirtualElement
    export function param<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function small(): VirtualElement
    export function small<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function small(first: VirtualContent): VirtualElement
    export function small<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function table(): VirtualElement
    export function table<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function table(first: VirtualContent): VirtualElement
    export function table<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function tbody(): VirtualElement
    export function tbody<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function tbody(first: VirtualContent): VirtualElement
    export function tbody<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function tfoot(): VirtualElement
    export function tfoot<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function tfoot(first: VirtualContent): VirtualElement
    export function tfoot<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function thead(): VirtualElement
    export function thead<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function thead(first: VirtualContent): VirtualElement
    export function thead<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function track(): VirtualElement
    export function track<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function track(first: VirtualContent): VirtualElement
    export function track<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function video(): VirtualElement
    export function video<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function video(first: VirtualContent): VirtualElement
    export function video<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function button(): VirtualElement
    export function button<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function button(first: VirtualContent): VirtualElement
    export function button<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function canvas(): VirtualElement
    export function canvas<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function canvas(first: VirtualContent): VirtualElement
    export function canvas<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function dialog(): VirtualElement
    export function dialog<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function dialog(first: VirtualContent): VirtualElement
    export function dialog<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function figure(): VirtualElement
    export function figure<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function figure(first: VirtualContent): VirtualElement
    export function figure<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function footer(): VirtualElement
    export function footer<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function footer(first: VirtualContent): VirtualElement
    export function footer<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function header(): VirtualElement
    export function header<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function header(first: VirtualContent): VirtualElement
    export function header<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function iframe(): VirtualElement
    export function iframe<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function iframe(first: VirtualContent): VirtualElement
    export function iframe<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function legend(): VirtualElement
    export function legend<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function legend(first: VirtualContent): VirtualElement
    export function legend<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function object(): VirtualElement
    export function object<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function object(first: VirtualContent): VirtualElement
    export function object<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function option(): VirtualElement
    export function option<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function option(first: VirtualContent): VirtualElement
    export function option<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function output(): VirtualElement
    export function output<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function output(first: VirtualContent): VirtualElement
    export function output<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function select(): VirtualElement
    export function select<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function select(first: VirtualContent): VirtualElement
    export function select<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function source(): VirtualElement
    export function source<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function source(first: VirtualContent): VirtualElement
    export function source<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function strong(): VirtualElement
    export function strong<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function strong(first: VirtualContent): VirtualElement
    export function strong<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function address(): VirtualElement
    export function address<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function address(first: VirtualContent): VirtualElement
    export function address<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function article(): VirtualElement
    export function article<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function article(first: VirtualContent): VirtualElement
    export function article<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function caption(): VirtualElement
    export function caption<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function caption(first: VirtualContent): VirtualElement
    export function caption<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function details(): VirtualElement
    export function details<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function details(first: VirtualContent): VirtualElement
    export function details<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function section(): VirtualElement
    export function section<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function section(first: VirtualContent): VirtualElement
    export function section<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function summary(): VirtualElement
    export function summary<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function summary(first: VirtualContent): VirtualElement
    export function summary<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function picture(): VirtualElement
    export function picture<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function picture(first: VirtualContent): VirtualElement
    export function picture<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function colgroup(): VirtualElement
    export function colgroup<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function colgroup(first: VirtualContent): VirtualElement
    export function colgroup<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function datalist(): VirtualElement
    export function datalist<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function datalist(first: VirtualContent): VirtualElement
    export function datalist<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function fieldset(): VirtualElement
    export function fieldset<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function fieldset(first: VirtualContent): VirtualElement
    export function fieldset<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function menuitem(): VirtualElement
    export function menuitem<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function menuitem(first: VirtualContent): VirtualElement
    export function menuitem<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function optgroup(): VirtualElement
    export function optgroup<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function optgroup(first: VirtualContent): VirtualElement
    export function optgroup<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function progress(): VirtualElement
    export function progress<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function progress(first: VirtualContent): VirtualElement
    export function progress<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function textarea(): VirtualElement
    export function textarea<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function textarea(first: VirtualContent): VirtualElement
    export function textarea<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function blockquote(): VirtualElement
    export function blockquote<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function blockquote(first: VirtualContent): VirtualElement
    export function blockquote<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
    export function figcaption(): VirtualElement
    export function figcaption<X>(
        first: VirtualElementProps & ValidateCustomPayloads<X>
    ): VirtualElement
    export function figcaption(first: VirtualContent): VirtualElement
    export function figcaption<X>(
        first: ValidateCustomPayloads<X> & X & VirtualElementProps,
        second: VirtualContent
    ): VirtualElement
}
